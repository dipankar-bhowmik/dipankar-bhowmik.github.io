(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealItems.forEach((element) => element.classList.add('is-visible'));
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const opened = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!opened));
      menuToggle.setAttribute('aria-label', opened ? 'Open navigation' : 'Close navigation');
      siteNav.classList.toggle('is-open', !opened);
    });
    siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      siteNav.classList.remove('is-open');
    }));
  }

  const skillTabs = [...document.querySelectorAll('.expertise-tab')];
  const skillPanels = [...document.querySelectorAll('.expertise-panel')];
  function activateSkillTab(tab, focus = false) {
    const target = tab.dataset.skill;
    skillTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    skillPanels.forEach((panel) => { panel.hidden = panel.id !== `panel-${target}`; });
    if (focus) tab.focus();
  }
  skillTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateSkillTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % skillTabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + skillTabs.length) % skillTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = skillTabs.length - 1;
      activateSkillTab(skillTabs[next], true);
    });
  });
  if (skillTabs[0]) activateSkillTab(skillTabs[0]);

  const workflow = {
    inventory: {
      index: 'STEP 01', title: 'Inventory the target hosts',
      description: 'Identify the managed Linux hosts and gather relevant system context before maintenance begins.',
      state: 'READY', command: 'ansible all -i inventory/hosts.ini -m ping',
      comment: '# Example command — illustrative, not a claim of a published repository'
    },
    preflight: {
      index: 'STEP 02', title: 'Check the maintenance prerequisites',
      description: 'Review host reachability, update availability, kernel details, and reboot considerations before applying changes.',
      state: 'PRE-CHECK', command: 'ansible-playbook -i inventory/hosts.ini patch.yml --check',
      comment: '# Illustrative dry-run pattern; adapt to the actual playbook and modules'
    },
    patch: {
      index: 'STEP 03', title: 'Apply the patch workflow',
      description: 'Use playbooks and shell scripts to perform consistent patching across multiple RHEL and Ubuntu hosts.',
      state: 'MAINTENANCE', command: 'ansible-playbook -i inventory/hosts.ini patch.yml',
      comment: '# Illustrative command — execute only with an approved change plan'
    },
    report: {
      index: 'STEP 04', title: 'Produce a structured report',
      description: 'Capture hostname, OS and kernel versions, available updates, and whether a reboot is required.',
      state: 'REPORTING', command: 'cat reports/patch-summary.csv',
      comment: '# Example report path; actual filenames depend on the implementation'
    }
  };
  const pipelineNodes = [...document.querySelectorAll('.pipeline-node')];
  const pipelineTitle = document.getElementById('pipeline-title');
  const pipelineDescription = document.getElementById('pipeline-description');
  const pipelineState = document.getElementById('pipeline-state');
  const pipelineIndex = document.querySelector('.detail-index');
  const terminalCommand = document.getElementById('terminal-command');
  const terminalComment = document.querySelector('.terminal-comment');
  function activateWorkflowStep(node) {
    const item = workflow[node.dataset.step];
    if (!item) return;
    pipelineNodes.forEach((other) => {
      const active = other === node;
      other.classList.toggle('is-current', active);
      other.setAttribute('aria-pressed', String(active));
    });
    pipelineIndex.textContent = item.index;
    pipelineTitle.textContent = item.title;
    pipelineDescription.textContent = item.description;
    pipelineState.textContent = item.state;
    terminalCommand.textContent = item.command;
    terminalComment.textContent = item.comment;
  }
  pipelineNodes.forEach((node) => node.addEventListener('click', () => activateWorkflowStep(node)));

  const toast = document.getElementById('toast');
  let toastTimeout;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('show'), 2400);
  }
  const copyButton = document.getElementById('copy-command');
  copyButton?.addEventListener('click', async () => {
    const command = terminalCommand.textContent;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard requires a secure context');
      await navigator.clipboard.writeText(command);
      showToast('Example command copied');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = command;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand('copy');
      textArea.remove();
      showToast(copied ? 'Example command copied' : 'Select and copy the command manually');
    }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

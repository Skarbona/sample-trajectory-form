const SEVERITY_OPTIONS = ['Low', 'Medium', 'Hard'];

const INPUT =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-950 dark:focus:ring-blue-400';
const ISSUE_CARD =
  'flex flex-col gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950';

const NAV_ACTIVE =
  'flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900';
const NAV_INACTIVE =
  'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800';

let issueCount = 1;

function bindSlider(slider, output) {
  const update = () => {
    output.textContent = slider.value;
  };
  slider.addEventListener('input', update);
  update();
}

function createIssueCard(index) {
  const card = document.createElement('article');
  card.className = ISSUE_CARD;
  card.dataset.issueId = String(index);

  card.innerHTML = `
    <label class="flex flex-col gap-2">
      <span class="text-sm font-bold">Issue ${index}</span>
      <textarea class="${INPUT} issue-text" rows="4" placeholder="Describe the issue…"></textarea>
    </label>
    <label class="flex flex-col gap-2">
      <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Severity</span>
      <select class="${INPUT} issue-severity">
        ${SEVERITY_OPTIONS.map((opt) => `<option value="${opt}">${opt}</option>`).join('')}
      </select>
    </label>
  `;

  return card;
}

function renderIssues() {
  const list = document.getElementById('issues-list');
  list.innerHTML = '';
  for (let i = 1; i <= issueCount; i += 1) {
    list.appendChild(createIssueCard(i));
  }
}

function setupNavigation() {
  const buttons = document.querySelectorAll('.nav-btn');
  const panelOne = document.getElementById('option-one');
  const panelTwo = document.getElementById('option-two');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOne = btn.dataset.option === 'one';

      buttons.forEach((b) => {
        const active = b === btn;
        b.className = `nav-btn ${active ? NAV_ACTIVE : NAV_INACTIVE}`;
        b.setAttribute('aria-selected', String(active));
      });

      panelOne.classList.toggle('hidden', !isOne);
      panelOne.hidden = !isOne;
      panelTwo.classList.toggle('hidden', isOne);
      panelTwo.classList.toggle('flex', !isOne);
      panelTwo.hidden = isOne;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();

  bindSlider(
    document.getElementById('trajectory-one'),
    document.getElementById('trajectory-one-out'),
  );
  bindSlider(
    document.getElementById('trajectory-two-top'),
    document.getElementById('trajectory-two-top-out'),
  );

  renderIssues();

  document.getElementById('add-issue').addEventListener('click', () => {
    issueCount += 1;
    renderIssues();
  });
});

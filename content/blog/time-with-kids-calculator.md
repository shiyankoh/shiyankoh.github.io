---
title: "Consider Living Near Your Kids"
date: 2026-03-25
slug: "time-with-kids"
---

There's a poster by Tim Urban that shows your entire life in weeks. 4,000 little boxes. It's sobering.

But for parents, there's a more specific version of this exercise: How much time do you actually have left with your kids? Conventionally the math people scare you with assumes they leave at 18 and are never under your roof again. Reasonable assumption - but neglects the benefits of living close by, or even together during their adult lives. This is something that has really been made clear to me when I moved back to Singapore 7 years ago, and had the opportunity to live with my parents, and for them to live with their grandchildren. It's a whole different dimension of parent/child/grandchild togetherness.

---

<style>
#time-calculator {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
max-width: 100%;
margin: 2rem 0;
}
.calc-section {
margin-bottom: 2rem;
padding: 1.5rem;
background: #fafafa;
border-radius: 8px;
}
.calc-section h3 {
margin-top: 0;
margin-bottom: 1rem;
font-size: 1.1rem;
color: #333;
}
.kid-entry {
display: flex;
gap: 1rem;
align-items: center;
margin-bottom: 0.75rem;
flex-wrap: wrap;
}
.kid-entry input[type="text"] {
width: 120px;
padding: 0.5rem;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 1rem;
}
.kid-entry input[type="number"] {
width: 70px;
padding: 0.5rem;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 1rem;
}
.kid-entry label {
font-size: 0.9rem;
color: #666;
}
.remove-kid {
background: none;
border: none;
color: #999;
cursor: pointer;
font-size: 1.2rem;
padding: 0 0.5rem;
}
.remove-kid:hover {
color: #e74c3c;
}
#add-kid {
background: #f0f0f0;
border: 1px dashed #ccc;
padding: 0.5rem 1rem;
border-radius: 4px;
cursor: pointer;
font-size: 0.9rem;
margin-top: 0.5rem;
}
#add-kid:hover {
background: #e8e8e8;
}
.input-row {
display: flex;
align-items: center;
gap: 1rem;
margin-bottom: 1rem;
flex-wrap: wrap;
}
.input-row label {
min-width: 140px;
font-size: 0.95rem;
color: #444;
}
.input-row select,
.input-row input {
padding: 0.5rem;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 1rem;
}
.input-row input[type="range"] {
width: 150px;
}
.range-value {
min-width: 60px;
font-size: 0.9rem;
color: #666;
}
.post18-options {
margin-top: 1rem;
padding-top: 1rem;
border-top: 1px solid #eee;
}
.period-entry {
display: flex;
gap: 0.5rem;
align-items: center;
margin-bottom: 0.5rem;
flex-wrap: wrap;
}
.period-entry input[type="number"] {
width: 55px;
padding: 0.4rem;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 0.9rem;
}
.period-entry select {
padding: 0.4rem;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 0.9rem;
}
.period-label {
font-size: 0.85rem;
color: #666;
}
.remove-period {
background: none;
border: none;
color: #999;
cursor: pointer;
font-size: 1.2rem;
padding: 0 0.3rem;
}
.remove-period:hover {
color: #e74c3c;
}
#add-period {
background: #f0f0f0;
border: 1px dashed #ccc;
padding: 0.4rem 0.8rem;
border-radius: 4px;
cursor: pointer;
font-size: 0.85rem;
margin-top: 0.5rem;
}
.results-container {
margin: 2rem 0;
}
.kid-result {
margin-bottom: 2.5rem;
}
.kid-headline {
font-size: 1.4rem;
font-weight: 600;
margin-bottom: 0.5rem;
color: #222;
}
.kid-headline .pct {
color: #e74c3c;
}
.kid-subline {
font-size: 1rem;
color: #666;
margin-bottom: 1rem;
}
.dot-grid-container {
margin: 1rem 0;
}
.grid-label {
font-size: 0.85rem;
color: #888;
margin-bottom: 0.25rem;
font-weight: 500;
}
.grid-divider {
font-size: 0.8rem;
color: #aaa;
margin: 0.75rem 0 0.25rem 0;
padding-top: 0.5rem;
border-top: 1px dashed #ddd;
}
.dot-grid {
display: flex;
flex-wrap: wrap;
gap: 3px;
max-width: 600px;
}
.dot {
width: 8px;
height: 8px;
border-radius: 2px;
transition: background-color 0.3s ease;
}
.dot.gone {
background-color: #444;
}
.dot.low-quality {
background-color: #ccc;
}
.dot.quality {
background-color: #4ade80;
}
.dot.post18-quality {
background-color: #22d3ee;
}
.dot.post18-low {
background-color: #e0e0e0;
}
.legend {
display: flex;
gap: 1.5rem;
margin-top: 1rem;
flex-wrap: wrap;
font-size: 0.85rem;
}
.legend-item {
display: flex;
align-items: center;
gap: 0.4rem;
}
.legend-dot {
width: 12px;
height: 12px;
border-radius: 2px;
}
.aggregate-result {
margin-top: 2rem;
padding: 1.5rem;
background: linear-gradient(135deg, #fef3c7, #fde68a);
border-radius: 8px;
}
.aggregate-result h3 {
margin: 0 0 0.5rem 0;
font-size: 1.2rem;
}
.aggregate-pct {
font-size: 2rem;
font-weight: 700;
color: #b45309;
}
@media (max-width: 600px) {
.dot {
width: 6px;
height: 6px;
}
.dot-grid {
gap: 2px;
}
.kid-headline {
font-size: 1.2rem;
}
}
</style>

<div id="time-calculator">

<div class="calc-section">
<h3>Your Kids</h3>
<div id="kids-container">
<div class="kid-entry" data-kid-id="0">
<input type="text" class="kid-name" placeholder="Name" value="Child 1">
<label>Age:</label>
<input type="number" class="kid-age" min="0" max="30" value="5">
<button class="remove-kid" title="Remove">&times;</button>
</div>
</div>
<button id="add-kid">+ Add another child</button>
</div>

<div class="calc-section">
<h3>Your Work Situation</h3>
<div class="input-row">
<label>Work setup:</label>
<select id="work-type">
<option value="office">Office (away ~10hrs/day)</option>
<option value="hybrid">Hybrid (3 days office)</option>
<option value="wfh">Work from home</option>
</select>
</div>
<div class="input-row">
<label>Work travel:</label>
<input type="range" id="travel-days" min="0" max="100" value="20">
<span class="range-value"><span id="travel-display">20</span> days/year</span>
</div>
</div>

<div class="calc-section">
<h3>Timeline</h3>
<div class="input-row">
<label>They leave home at:</label>
<input type="number" id="leave-age" min="16" max="30" value="18">
</div>
<div class="post18-options">
<div class="grid-label" style="margin-bottom: 0.75rem;">After they leave home:</div>
<div id="periods-container">
<div class="period-entry" data-period-id="0">
<span class="period-label">Ages</span>
<input type="number" class="period-start" min="18" max="100" value="18">
<span class="period-label">to</span>
<input type="number" class="period-end" min="18" max="100" value="30">
<select class="period-type">
<option value="rarely">Rarely (~2 weeks/year)</option>
<option value="monthly" selected>Monthly visits</option>
<option value="weekly">Weekly (live nearby)</option>
<option value="together">Live together</option>
</select>
<button class="remove-period" title="Remove">&times;</button>
</div>
</div>
<button id="add-period">+ Add another period</button>
</div>
</div>

<div class="results-container" id="results"></div>

</div>

<script>
(function() {
var WEEKS_PER_YEAR = 52;
var SCHOOL_HOURS_PER_DAY = 7;
var SCHOOL_DAYS_PER_YEAR = 180;
var SCHOOL_START_AGE = 5;

function getSleepHours(age) {
if (age < 3) return 12;
if (age < 6) return 11;
if (age < 13) return 10;
if (age < 18) return 9;
return 8;
}

function getWorkHoursAway(workType) {
if (workType === 'office') return 10;
if (workType === 'hybrid') return 6;
if (workType === 'wfh') return 0;
return 10;
}

function calculateWeeklyQualityHours(age, workType, isWeekend) {
var sleepHours = getSleepHours(age);
var wakingHoursPerDay = 24 - sleepHours;
if (isWeekend) {
return wakingHoursPerDay * 2;
}
var availableHours = wakingHoursPerDay;
if (age >= SCHOOL_START_AGE && age < 18) {
var schoolHoursPerWeek = (SCHOOL_HOURS_PER_DAY * SCHOOL_DAYS_PER_YEAR) / WEEKS_PER_YEAR;
availableHours -= schoolHoursPerWeek / 5;
}
availableHours -= getWorkHoursAway(workType);
return Math.max(0, availableHours) * 5;
}

function calculateWeekDataWithPeriods(age, workType, travelDays, leaveAge, periods, currentAge) {
var weekInLife = Math.floor(age * WEEKS_PER_YEAR);
var currentWeek = Math.floor(currentAge * WEEKS_PER_YEAR);
if (weekInLife < currentWeek) {
return { status: 'gone', qualityHours: 0 };
}
var weekendHours = calculateWeeklyQualityHours(age, workType, true);
var weekdayHours = calculateWeeklyQualityHours(age, workType, false);
var totalQualityHours = weekendHours + weekdayHours;
var travelWeeks = travelDays / 7;
var travelProbability = travelWeeks / WEEKS_PER_YEAR;
var adjustedQualityHours = totalQualityHours * (1 - travelProbability);
var status;
var wakingHoursPerWeek = (24 - getSleepHours(age)) * 7;
var qualityRatio = adjustedQualityHours / wakingHoursPerWeek;
if (age < leaveAge) {
status = qualityRatio > 0.3 ? 'quality' : 'low-quality';
return { status: status, qualityHours: adjustedQualityHours };
} else {
var post18Hours = 0;
var periodType = 'rarely';
for (var i = 0; i < periods.length; i++) {
if (age >= periods[i].start && age < periods[i].end) {
periodType = periods[i].type;
break;
}
}
if (periodType === 'rarely') {
post18Hours = (2 * 7 * (24 - 8)) / WEEKS_PER_YEAR;
} else if (periodType === 'monthly') {
post18Hours = (2 * (24 - 8)) / 4;
} else if (periodType === 'weekly') {
post18Hours = 24 - 8;
} else if (periodType === 'together') {
post18Hours = weekendHours + calculateWeeklyQualityHours(age, 'wfh', false);
}
status = post18Hours > 8 ? 'post18-quality' : 'post18-low';
return { status: status, qualityHours: post18Hours };
}
}

var kidCounter = 1;
var periodCounter = 1;
var kidsContainer = document.getElementById('kids-container');
var addKidBtn = document.getElementById('add-kid');
var periodsContainer = document.getElementById('periods-container');
var addPeriodBtn = document.getElementById('add-period');
var workTypeSelect = document.getElementById('work-type');
var travelSlider = document.getElementById('travel-days');
var travelDisplay = document.getElementById('travel-display');
var leaveAgeInput = document.getElementById('leave-age');
var resultsContainer = document.getElementById('results');

addKidBtn.addEventListener('click', function() {
var kidEntry = document.createElement('div');
kidEntry.className = 'kid-entry';
kidEntry.setAttribute('data-kid-id', kidCounter);
kidEntry.innerHTML = '<input type="text" class="kid-name" placeholder="Name" value="Child ' + (kidCounter + 1) + '"><label>Age:</label><input type="number" class="kid-age" min="0" max="30" value="0"><button class="remove-kid" title="Remove">&times;</button>';
kidsContainer.appendChild(kidEntry);
kidCounter++;
attachKidListeners(kidEntry);
recalculate();
});

function attachKidListeners(entry) {
var removeBtn = entry.querySelector('.remove-kid');
var nameInput = entry.querySelector('.kid-name');
var ageInput = entry.querySelector('.kid-age');
removeBtn.addEventListener('click', function() {
if (kidsContainer.children.length > 1) {
entry.remove();
recalculate();
}
});
nameInput.addEventListener('input', recalculate);
ageInput.addEventListener('input', recalculate);
}

attachKidListeners(kidsContainer.querySelector('.kid-entry'));

addPeriodBtn.addEventListener('click', function() {
var lastPeriod = periodsContainer.querySelector('.period-entry:last-child');
var lastEnd = lastPeriod ? parseInt(lastPeriod.querySelector('.period-end').value) || 30 : 30;
var periodEntry = document.createElement('div');
periodEntry.className = 'period-entry';
periodEntry.setAttribute('data-period-id', periodCounter);
periodEntry.innerHTML = '<span class="period-label">Ages</span><input type="number" class="period-start" min="18" max="100" value="' + lastEnd + '"><span class="period-label">to</span><input type="number" class="period-end" min="18" max="100" value="' + (lastEnd + 20) + '"><select class="period-type"><option value="rarely">Rarely (~2 weeks/year)</option><option value="monthly">Monthly visits</option><option value="weekly" selected>Weekly (live nearby)</option><option value="together">Live together</option></select><button class="remove-period" title="Remove">&times;</button>';
periodsContainer.appendChild(periodEntry);
periodCounter++;
attachPeriodListeners(periodEntry);
recalculate();
});

function attachPeriodListeners(entry) {
var removeBtn = entry.querySelector('.remove-period');
var startInput = entry.querySelector('.period-start');
var endInput = entry.querySelector('.period-end');
var typeSelect = entry.querySelector('.period-type');
removeBtn.addEventListener('click', function() {
if (periodsContainer.children.length > 1) {
entry.remove();
recalculate();
}
});
startInput.addEventListener('input', recalculate);
endInput.addEventListener('input', recalculate);
typeSelect.addEventListener('change', recalculate);
}

attachPeriodListeners(periodsContainer.querySelector('.period-entry'));

workTypeSelect.addEventListener('change', recalculate);
travelSlider.addEventListener('input', function() {
travelDisplay.textContent = this.value;
recalculate();
});
leaveAgeInput.addEventListener('input', recalculate);

function recalculate() {
var workType = workTypeSelect.value;
var travelDays = parseInt(travelSlider.value);
var leaveAge = parseInt(leaveAgeInput.value) || 18;

var periodEntries = periodsContainer.querySelectorAll('.period-entry');
var periods = [];
for (var p = 0; p < periodEntries.length; p++) {
periods.push({
start: parseInt(periodEntries[p].querySelector('.period-start').value) || 18,
end: parseInt(periodEntries[p].querySelector('.period-end').value) || 30,
type: periodEntries[p].querySelector('.period-type').value
});
}

var kidEntries = kidsContainer.querySelectorAll('.kid-entry');
var kids = [];
for (var i = 0; i < kidEntries.length; i++) {
kids.push({
name: kidEntries[i].querySelector('.kid-name').value || 'Child',
age: parseFloat(kidEntries[i].querySelector('.kid-age').value) || 0
});
}

var html = '';
var totalSpent = 0;
var totalPossible = 0;

for (var k = 0; k < kids.length; k++) {
var kid = kids[k];
var maxPeriodEnd = leaveAge;
for (var mp = 0; mp < periods.length; mp++) {
if (periods[mp].end > maxPeriodEnd) maxPeriodEnd = periods[mp].end;
}
var maxAge = maxPeriodEnd;
var weeksTotal = maxAge * WEEKS_PER_YEAR;
var spentHours = 0;
var remainingQualityHours = 0;
var totalPossibleHours = 0;
var dots = [];

for (var w = 0; w < weeksTotal; w++) {
var ageAtWeek = w / WEEKS_PER_YEAR;
var weekData = calculateWeekDataWithPeriods(ageAtWeek, workType, travelDays, leaveAge, periods, kid.age);
dots.push(weekData);
var wakingHours = (24 - getSleepHours(ageAtWeek)) * 7;
totalPossibleHours += wakingHours;
if (weekData.status === 'gone') {
spentHours += wakingHours;
} else {
remainingQualityHours += weekData.qualityHours;
}
}

var pctSpent = Math.round((spentHours / totalPossibleHours) * 100);
var pctRemaining = 100 - pctSpent;
totalSpent += spentHours;
totalPossible += totalPossibleHours;

var childhoodDots = '';
var childhoodWeeks = leaveAge * WEEKS_PER_YEAR;
for (var d = 0; d < childhoodWeeks && d < dots.length; d++) {
childhoodDots += '<div class="dot ' + dots[d].status + '"></div>';
}

var post18Dots = '';
for (var d2 = childhoodWeeks; d2 < dots.length; d2++) {
post18Dots += '<div class="dot ' + dots[d2].status + '"></div>';
}

html += '<div class="kid-result">';
html += '<div class="kid-headline">You\'ve already spent <span class="pct">' + pctSpent + '%</span> of your time with ' + kid.name + '.</div>';
html += '<div class="kid-subline">' + pctRemaining + '% remains. That\'s ' + Math.round(remainingQualityHours) + ' quality hours left.</div>';
html += '<div class="dot-grid-container">';
html += '<div class="grid-label">Birth to ' + leaveAge + ' (childhood)</div>';
html += '<div class="dot-grid">' + childhoodDots + '</div>';
if (maxAge > leaveAge) {
html += '<div class="grid-divider">After they leave home (' + leaveAge + '+)</div>';
html += '<div class="dot-grid">' + post18Dots + '</div>';
}
html += '</div>';
html += '<div class="legend">';
html += '<div class="legend-item"><div class="legend-dot" style="background:#444"></div> Already gone</div>';
html += '<div class="legend-item"><div class="legend-dot" style="background:#ccc"></div> Future (low presence)</div>';
html += '<div class="legend-item"><div class="legend-dot" style="background:#4ade80"></div> Quality time</div>';
if (maxAge > leaveAge) {
html += '<div class="legend-item"><div class="legend-dot" style="background:#22d3ee"></div> Post-18 together</div>';
}
html += '</div>';
html += '</div>';
}

if (kids.length > 1) {
var aggPct = Math.round((totalSpent / totalPossible) * 100);
html += '<div class="aggregate-result">';
html += '<h3>Across all your kids</h3>';
html += '<div class="aggregate-pct">' + aggPct + '% of your total kid-time is behind you.</div>';
html += '</div>';
}

resultsContainer.innerHTML = html;
}

recalculate();
})();
</script>

---

Play with the toggles. Add a period where you live nearby. Watch the dots light up.

The childhood years feel urgent, but they're already half-spent by the time your kid is 9. The real opportunity is the decades after they leave home. If you stay close - geographically, not just emotionally - you get that time back.

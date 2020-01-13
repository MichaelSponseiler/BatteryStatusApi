var chargingStateEl = document.getElementById('chargingState');
var batteryTime = document.getElementById('batteryTime');
var chargingTimeLable = document.getElementById('chargingTimeLable');
var levelEl = document.getElementById('level');

function updateBatteryUI(battery) {
	console.log('Update triggered');
	levelEl.style.width = (battery.level * 100) + '%';
    levelEl.textContent = (battery.level * 100) + '%';

  if (battery.charging === true) {
    chargingStateEl.textContent = 'Charging';
    chargingTimeLable.innerHTML = 'Fully charged in: ';
    batteryTime.textContent = battery.chargingTime + ' Seconds';

  } else if (battery.charging === false) {
    chargingStateEl.textContent = 'Discharging';
    chargingTimeLable.innerHTML = 'Remaining time:';
    batteryTime.textContent = battery.dischargingTime + ' Seconds';
  }
}

function monitorBattery(battery) {
  // Update the initial UI.
  updateBatteryUI(battery);

  // Monitor for futher updates.
  battery.addEventListener('levelchange',
    updateBatteryUI.bind(null, battery));
  battery.addEventListener('chargingchange',
    updateBatteryUI.bind(null, battery));
  battery.addEventListener('dischargingtimechange',
    updateBatteryUI.bind(null, battery));
  battery.addEventListener('chargingtimechange',
    updateBatteryUI.bind(null, battery));
}

if ('getBattery' in navigator) {
  document.getElementById('api-status').innerHTML = 'The Battery Status API is supported on this platform.';
  navigator.getBattery().then(monitorBattery);
} else {
  document.getElementById('api-status').innerHTML = 'The Battery Status API is not supported on this platform.';
}
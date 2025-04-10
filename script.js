document.addEventListener('DOMContentLoaded', function() {
  const startDate = "2024-12-13";
  const countdownLabel = document.getElementById('countdown-label');
  const yearsElement = document.getElementById('years');
  const monthsElement = document.getElementById('months');
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  function calculateTimeLeft() {
      const startDateTime = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = now - startDateTime;
      const isNegative = difference < 0;
      const absDifference = Math.abs(difference);

      // Calculate time components
      const seconds = Math.floor(absDifference / 1000) % 60;
      const minutes = Math.floor(absDifference / (1000 * 60)) % 60;
      const hours = Math.floor(absDifference / (1000 * 60 * 60)) % 24;

      // Calculate years, months, and remaining days
      const startDateObj = new Date(startDate);
      const currentDate = new Date();

      let years = 0;
      let months = 0;
      let days = 0;

      if (!isNegative) {
          // For positive difference (date is in the past)
          years = currentDate.getFullYear() - startDateObj.getFullYear();

          // Adjust years if we haven't reached the month/day yet
          if (
              currentDate.getMonth() < startDateObj.getMonth() ||
              (currentDate.getMonth() === startDateObj.getMonth() && currentDate.getDate() < startDateObj.getDate())
          ) {
              years--;
          }

          // Calculate months
          months = currentDate.getMonth() - startDateObj.getMonth();
          if (months < 0) months += 12;

          // Adjust months if we haven't reached the day yet
          if (currentDate.getDate() < startDateObj.getDate()) {
              months--;
              if (months < 0) months += 12;
          }

          // Calculate days
          const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
          days = currentDate.getDate() - startDateObj.getDate();
          if (days < 0) {
              days += lastMonthDate;
          }
      } else {
          // Este bloco não será executado com a data no passado, mas mantemos por completude
          // For negative difference (date is in the future)
          years = startDateObj.getFullYear() - currentDate.getFullYear();

          // Adjust years if we haven't reached the month/day yet
          if (
              startDateObj.getMonth() < currentDate.getMonth() ||
              (startDateObj.getMonth() === currentDate.getMonth() && startDateObj.getDate() < currentDate.getDate())
          ) {
              years--;
          }

          // Calculate months
          months = startDateObj.getMonth() - currentDate.getMonth();
          if (months < 0) months += 12;

          // Adjust months if we haven't reached the day yet
          if (startDateObj.getDate() < currentDate.getDate()) {
              months--;
              if (months < 0) months += 12;
          }

          // Calculate days
          const lastMonthDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 0).getDate();
          days = startDateObj.getDate() - currentDate.getDate();
          if (days < 0) {
              days += lastMonthDate;
          }
      }

      return {
          years,
          months,
          days,
          hours,
          minutes,
          seconds,
          isNegative
      };
  }

  function updateCountdown() {
      const timeLeft = calculateTimeLeft();
      
      // Update the DOM elements
      yearsElement.textContent = timeLeft.years;
      monthsElement.textContent = timeLeft.months;
      daysElement.textContent = timeLeft.days;
      hoursElement.textContent = timeLeft.hours;
      minutesElement.textContent = timeLeft.minutes;
      secondsElement.textContent = timeLeft.seconds;
      
      // Como a data agora está no passado, sempre mostrará "Tempo juntos:"
      countdownLabel.textContent = "Tempo juntos:";
  }

  // Update the countdown every second
  setInterval(updateCountdown, 1000);
  
  // Initial update
  updateCountdown();
});
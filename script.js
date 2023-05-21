//Async fuction to search
async function searchNationality() {
  const nameInput = document.getElementById('nameInput');
  const resultContainer = document.getElementById('resultContainer');
  const name = nameInput.value.trim();

  if (name === '') {
      resultContainer.innerHTML = 'Please enter a valid name.';
      return;
  }
// To Fetch Data from Nationalize API usinf Fetch and Await
  try {
      const response = await fetch(`https://api.nationalize.io/?name=${name}`);
      const data = await response.json();

      if (data.country && data.country.length > 0) {
          const topCountries = data.country.slice(0, 2);
          const probability = topCountries[0].probability.toFixed(2);

          let resultHTML = `<h2 class="mt-4">Results for ${name}:</h2>`;
          resultHTML += `<p>Top Nationalities:</p>`;
          resultHTML += `<ul class="list-group">`;

          topCountries.forEach(country => {
              const countryCode = country.country_id;
              const countryName = country.country_name;
              resultHTML += `<li class="list-group-item">${countryName} (${countryCode})</li>`;
          });

          resultHTML += `</ul>`;
          resultHTML += `<p class="mt-2">Probability: ${probability}</p>`;

          resultContainer.innerHTML = resultHTML;
          resultContainer.classList.add('alert', 'alert-success');
      } else {
          resultContainer.innerHTML = `No results found for ${name}.`;
          resultContainer.classList.add('alert', 'alert-warning');
      }
  } catch (error) {
      resultContainer.innerHTML = 'An error occurred while fetching data.';
      resultContainer.classList.add('alert', 'alert-danger');
  }
}

function highlightText() {
  const nameInput = document.getElementById('nameInput');
  const resultContainer = document.getElementById('resultContainer');
  const searchText = nameInput.value.trim();
  const resultText = resultContainer.innerHTML;

  if (searchText === '') {
      resultContainer.innerHTML = resultText;
      return;
  }

  const regex = new RegExp(searchText, 'gi');
  const highlightedText = resultText.replace(regex, match => `<span class="highlight">${match}</span>`);
  resultContainer.innerHTML = highlightedText;
}
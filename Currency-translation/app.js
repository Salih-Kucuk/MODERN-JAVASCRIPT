const api_key = "d3710f433a22fa49873d8a1a";
const url = " https://v6.exchangerate-api.com/v6/" + api_key;

//elements 

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let option;
        for (let item of items) {
            option += `<option value="${item[0]}>${item[1]}"</option>`;
        }
        list_one.innerHTML = option;
        list_two.innerHTML = option;
    });

calculate.addEventListener("click", () => {
    const currency1 = currency_one.value.slice(0,3);
    const currency2 = currency_two.value.slice(0,3);
    const amounty = amount.value;

    fetch(url + "/latest/" + currency1)
        .then(res => res.json())
        .then(data => {
            const resulty = (data.conversion_rates[currency2] * amounty).toFixed(3);
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;">
                        ${amounty} ${currency1} = ${resulty} ${currency2}
                    </div>
                </div> 
            `;
        })
});
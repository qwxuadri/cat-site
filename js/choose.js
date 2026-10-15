// Підбір кота на сторінці "Кому підходить".
// Кожна відповідь у формі має атрибути:
//   data-points="british:2 persian:1"  — скільки балів отримує кожна порода
//   data-no="siamese bengal"            — породи, які з цією відповіддю не підходять
// Після натискання "Готово" рахуємо бали й показуємо породу, що набрала найбільше.

const form = document.querySelector('#quiz');
const results = document.querySelectorAll('.result');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // не перезавантажувати сторінку

    // Початкові бали. Якщо бали однакові, перемагає порода, що вище в цьому списку
    const points = { british: 0, maincoon: 0, siamese: 0, fold: 0, bengal: 0, persian: 0 };
    let notSuitable = [];

    // Перебираємо всі відмічені відповіді (і кружечки, і галочки)
    form.querySelectorAll('input:checked').forEach(function (answer) {
        answer.dataset.points.split(' ').forEach(function (pair) {
            const [cat, value] = pair.split(':');  // "british:2" -> "british" і "2"
            points[cat] += Number(value);
        });

        if (answer.dataset.no) {
            notSuitable = notSuitable.concat(answer.dataset.no.split(' '));
        }
    });

    // Шукаємо породу з найбільшою кількістю балів серед тих, що підходять
    let best = null;
    for (const cat in points) {
        if (notSuitable.includes(cat)) continue;
        if (best === null || points[cat] > points[best]) {
            best = cat;
        }
    }

    // Ховаємо всі результати й показуємо лише потрібний
    results.forEach(function (result) {
        result.hidden = true;
    });
    const winner = document.querySelector('#result-' + best);
    winner.hidden = false;
    winner.focus(); // сторінка сама прокрутиться до результату
});

// Кнопка "Скинути відповіді" очищає форму — ховаємо й результат
form.addEventListener('reset', function () {
    results.forEach(function (result) {
        result.hidden = true;
    });
});

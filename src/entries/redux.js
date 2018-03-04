import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SONG':
            return [...state, action.payload];
            break;
        default:
            return state;
            break;
    }
}

const form = document.getElementById("pasito");
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const title = data.get("title");
    store.dispatch({
        'type': 'ADD_SONG',
        'payload': { title }
    });
};
form.addEventListener("submit", handleSubmit);
const initialState = [
    {
        "title": "despacito"
    },
    {
        "title": "One more time"
    },
    {
        "title": "Echame la culpa"
    }
];

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const render = () => {
    const container = document.getElementById("playlist");
    const playlist = store.getState();
    container.innerHTML = '';
    const $fCh = container.firstChild;
    while ($fCh) container.remove($fCh);
    playlist.forEach((item) => {
        const template = document.createElement('p');
        template.textContent = item.title;
        container.appendChild(template);
    });
};
render();

const handleChange = () => {
    render();
};

store.subscribe(handleChange);
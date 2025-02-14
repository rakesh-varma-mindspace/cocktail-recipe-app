import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const cocktail = response.data.drinks[0];

        res.render('index', {
            name: cocktail.strDrink,
            image: cocktail.strDrinkThumb,
            instructions: cocktail.strInstructions,
            ingredients: Object.keys(cocktail).filter(key => key.startsWith('strIngredient') && cocktail[key]).map(key => cocktail[key])
        });
    } catch (error) {
        console.error(error);
        res.render('index', { error: 'Could not fetch cocktail data. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
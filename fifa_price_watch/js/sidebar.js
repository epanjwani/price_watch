function createDataDiv(category, card, data, favorite)
{
    let target_div;
    if (favorite)
        target_div = "#favorites_container";
    else
        target_div = "#".concat(category, "_container");
    let innerdiv = $(("<div></div>"));
    innerdiv.attr("class", "entry");
    let idstr = category.concat(".", card);
    innerdiv.attr("id", idstr);
    let originalname = card;
    if (category == "position")
        card = card.replace("_", " -> ");
    let name = $(("<p class='card_name'>").concat(card, "</p>"));
    let minprice = $(("<p class = 'min'>Min avg BIN today: ").concat(data["min"], "</p>"));
    let star_id = originalname.concat("_star");
    let img_string = ("<img src = 'img/star.png' class = 'favoriteicon' onmouseover= this.src='img/goldstar.png' onmouseout= this.src='img/star.png' onclick = updateFavorites('").concat(idstr, "')>");
    let img = $(img_string);
    let maxprice = $(("<p class = 'max'>Max avg BIN today: ").concat(data["max"], "</p>"));
    let currentprice = $(("<p class = 'current'>Current avg BIN: ").concat(data["current"], "</p>"));
    innerdiv.append(name);
    innerdiv.append(minprice);
    innerdiv.append(img);
    innerdiv.append(maxprice);
    innerdiv.append(currentprice);
    $(target_div).append(innerdiv);
}

function updateFavorites(card)
{
    if (favorites.includes(card))
    {
        favorites.splice(favorites.indexOf(card), 1);
    }
    else
        favorites.push(card);
    updateFavoritesSection(sidebar_data);
}

function updateFavoritesSection(data)
{
    let head = $("<div id = 'favorites_section' class = 'divider'>Favorites</div>");
    $("#favorites_container").empty();
    $("#favorites_container").append(head);
    if (data)
    {
        for (let i = 0; i < favorites.length; i++)
        {
            let index = favorites[i].indexOf(".");
            let category = favorites[i].substr(0, index);
            let card = favorites[i].substr(index+1);
            createDataDiv(category, card, data[category][card], true);
        }
    }
    updateLocalStorage();
}

function loadLocalStorage(data)
{
    let result = localStorage.getItem('favorites');
    if (result)
        favorites = JSON.parse(result);
    updateFavoritesSection(data);
}

function updateLocalStorage()
{
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
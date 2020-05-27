function createDataDiv(category, card, data)
{
    let target_div = "#".concat(category, "_container");
    let innerdiv = $(("<div></div>"));
    innerdiv.attr("class", "entry");
    let originalname = card;
    if (category == "position")
        card = card.replace("_", " -> ");
    let name = $(("<p class='card_name'>").concat(card, "</p>"));
    let minprice = $(("<p class = 'min'>Min avg BIN today: ").concat(data["min"], "</p>"));
    let star_id = originalname.concat("_star");
    let img_string = ("<img src = 'img/star.png' class = 'favoriteicon' onmouseover= this.src='img/goldstar.png' onmouseout= this.src='img/star.png' id = ").concat(star_id, ">");
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
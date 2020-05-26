function createDataDiv(category, card, data)
{
    let target_div = "#".concat(category, "_container");
    let innerdiv = $(("<div></div>"));
    innerdiv.attr("class", "entry");
    if (category == "position")
        card = card.replace("_", " -> ");
    let name = $(("<p class='card_name'>").concat(card, "</p>"));
    let minprice = $(("<p class = 'min'>Min avg BIN today: ").concat(data["min"], "</p>"));
    let maxprice = $(("<p class = 'max'>Max avg BIN today: ").concat(data["max"], "</p>"));
    let currentprice = $(("<p class = 'current'>Current avg BIN: ").concat(data["current"], "</p>"));
    innerdiv.append(name);
    innerdiv.append(minprice);
    innerdiv.append(maxprice);
    innerdiv.append(currentprice);
    $(target_div).append(innerdiv);
}
<!DOCTYPE html> <html><head>
    <meta charset="utf-8"/>
        <title>FIFA Consumable Trading</title> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"></script>
    <script type = "text/javascript" src = "js/data.js"></script>
    <script type = "text/javascript" src = "js/charts.js"></script>
    <script type = "text/javascript" src = "js/helpers.js"></script>
    <link rel = "stylesheet" type = "text/css" href = "css/style.css"></link>
    </head>
    <body>
    <div id = "chart_div">
    </div>
<hr>
<button type = "button" id = "fitness_button">Squad Fitness</button>
<button type = "button" id = "chemistry_button">Chemistry Styles</button>
<button type = "button" id = "position_button">Position Modifiers</button>
<button type = "button" id = "day_button">Day</button>
<button type = "button" id = "week_button">Week</button>
<button type = "button" id = "forward_button">--></button>
<button type = "button" id = "back_button"><--</button>
<script type = "text/javascript" src = "js/listeners.js"></script>

<?php
    require 'php/database.php';
?>
</body></html>
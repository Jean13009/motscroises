<!DOCTYPE html>
<html>

    <style>

        * {
            margin: 0;
            padding: 0;
        }

        html,
        body {
            width: 100%;
            height: 100%;
        }

        canvas {
            display: block;
        }

    </style>

    <body>
        <head>
            <link rel="icon" href="favicon.png" sizes="16x16" type="image/png">
        </head>
        <input type="text" id="name" name="name" style="display:inline; position:absolute; z-index: 1; top:80px; left: 80px; height:717px; width: 477px;">
        <canvas id="canvas" width="1500" height="1000" style="z-index: 2; position:absolute;">
        </canvas>

        <script src="src/paint.js"></script>
        <script src="src/listener.js"></script>
        <script src="src/game.js"></script>

    </body>
</html>
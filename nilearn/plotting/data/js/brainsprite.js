function brainsprite(e) {
    function a(e, a) {
        return (e.imageSmoothingEnabled = a), e;
    }
    var n = {},
        n = Object.assign(
            {},
            {
                nanValue: !1,
                smooth: !1,
                flagValue: !1,
                colorBackground: "#000000",
                flagCoordinates: !1,
                origin: { X: 0, Y: 0, Z: 0 },
                voxelSize: 1,
                affine: !1,
                heightColorBar: 0.04,
                sizeFont: 0.075,
                colorFont: "#FFFFFF",
                nbDecimals: 3,
                crosshair: !1,
                colorCrosshair: "#0000FF",
                sizeCrosshair: 0.9,
                title: !1,
                numSlice: !1,
                radiological: !1,
                showLR: !1,
            },
            e
        );
    return (
        "boolean" == typeof n.affine &&
            !1 === n.affine &&
            (n.affine = [
                [n.voxelSize, 0, 0, -n.origin.X],
                [0, n.voxelSize, 0, -n.origin.Y],
                [0, 0, n.voxelSize, -n.origin.Z],
                [0, 0, 0, 1],
            ]),
        (n.canvas = document.getElementById(e.canvas)),
        (n.context = n.canvas.getContext("2d")),
        (n.context = a(n.context, n.smooth)),
        (n.canvasY = document.createElement("canvas")),
        (n.contextY = n.canvasY.getContext("2d")),
        (n.canvasZ = document.createElement("canvas")),
        (n.contextZ = n.canvasZ.getContext("2d")),
        (n.canvasRead = document.createElement("canvas")),
        (n.contextRead = n.canvasRead.getContext("2d")),
        (n.canvasRead.width = 1),
        (n.canvasRead.height = 1),
        (n.onclick = void 0 !== e.onclick ? e.onclick : ""),
        n.flagCoordinates ? (n.spaceFont = 0.1) : (n.spaceFont = 0),
        (n.sprite = document.getElementById(e.sprite)),
        (n.nbCol = n.sprite.width / e.nbSlice.Y),
        (n.nbRow = n.sprite.height / e.nbSlice.Z),
        (n.nbSlice = { X: void 0 !== e.nbSlice.X ? e.nbSlice.X : n.nbCol * n.nbRow, Y: e.nbSlice.Y, Z: e.nbSlice.Z }),
        (n.widthCanvas = { X: 0, Y: 0, Z: 0 }),
        (n.heightCanvas = { X: 0, Y: 0, Z: 0, max: 0 }),
        !1 == n.numSlice && (n.numSlice = { X: Math.floor(n.nbSlice.X / 2), Y: Math.floor(n.nbSlice.Y / 2), Z: Math.floor(n.nbSlice.Z / 2) }),
        (n.coordinatesSlice = { X: 0, Y: 0, Z: 0 }),
        (n.planes = {}),
        (n.planes.canvasMaster = document.createElement("canvas")),
        (n.planes.contextMaster = n.planes.canvasMaster.getContext("2d")),
        (e.overlay = void 0 !== e.overlay && e.overlay),
        e.overlay &&
            ((n.overlay = {}),
            (n.overlay.sprite = document.getElementById(e.overlay.sprite)),
            (n.overlay.nbCol = n.overlay.sprite.width / e.overlay.nbSlice.Y),
            (n.overlay.nbRow = n.overlay.sprite.height / e.overlay.nbSlice.Z),
            (n.overlay.nbSlice = { X: void 0 !== e.overlay.nbSlice.X ? e.overlay.nbSlice.X : n.overlay.nbCol * n.overlay.nbRow, Y: e.overlay.nbSlice.Y, Z: e.overlay.nbSlice.Z }),
            (n.overlay.opacity = void 0 !== e.overlay.opacity ? e.overlay.opacity : 1)),
        (e.colorMap = void 0 !== e.colorMap && e.colorMap),
        e.colorMap &&
            ((n.colorMap = {}),
            (n.colorMap.img = document.getElementById(e.colorMap.img)),
            (n.colorMap.min = e.colorMap.min),
            (n.colorMap.max = e.colorMap.max),
            (e.colorMap.hide = void 0 !== e.colorMap.hide && e.colorMap.hide),
            (n.colorMap.canvas = document.createElement("canvas")),
            (n.colorMap.context = n.colorMap.canvas.getContext("2d")),
            (n.colorMap.canvas.width = n.colorMap.img.width),
            (n.colorMap.canvas.height = n.colorMap.img.height),
            n.colorMap.context.drawImage(n.colorMap.img, 0, 0, n.colorMap.img.width, n.colorMap.img.height, 0, 0, n.colorMap.img.width, n.colorMap.img.height)),
        (n.getValue = function (e, a) {
            var n, t, i, l, o, c;
            if (!a) return NaN;
            for (xx = 0, i = a.canvas.width, l = NaN, o = 1 / 0; xx < i; xx++) (t = Math.pow((n = a.context.getImageData(xx, 0, 1, 1).data)[0] - e[0], 2) + Math.pow(n[1] - e[1], 2) + Math.pow(n[2] - e[2], 2)) < o && ((l = xx), (o = t));
            return (l * (a.max - a.min)) / (i - 1) + a.min;
        }),
        (n.updateValue = function () {
            var e = {},
                a = [],
                t = [];
            if (n.overlay && !n.nanValue)
                try {
                    (e.XW = Math.round(n.numSlice.X % n.nbCol)),
                        (e.XH = Math.round((n.numSlice.X - e.XW) / n.nbCol)),
                        (n.contextRead.fillStyle = "#FFFFFF"),
                        n.contextRead.fillRect(0, 0, 1, 1),
                        n.contextRead.drawImage(n.overlay.sprite, e.XW * n.nbSlice.Y + n.numSlice.Y, e.XH * n.nbSlice.Z + n.nbSlice.Z - n.numSlice.Z - 1, 1, 1, 0, 0, 1, 1),
                        (rgb = n.contextRead.getImageData(0, 0, 1, 1).data),
                        (a = 255 == rgb[0] && 255 == rgb[1] && 255 == rgb[2]),
                        (n.contextRead.fillStyle = "#000000"),
                        n.contextRead.fillRect(0, 0, 1, 1),
                        n.contextRead.drawImage(n.overlay.sprite, e.XW * n.nbSlice.Y + n.numSlice.Y, e.XH * n.nbSlice.Z + n.nbSlice.Z - n.numSlice.Z - 1, 1, 1, 0, 0, 1, 1),
                        (rgb = n.contextRead.getImageData(0, 0, 1, 1).data),
                        (t = 0 == rgb[0] && 0 == rgb[1] && 0 == rgb[2]),
                        a && t ? (n.voxelValue = NaN) : (n.voxelValue = n.getValue(rgb, n.colorMap));
                } catch (i) {
                    console.warn(i.message), (rgb = 0), (n.nanValue = !0), (n.voxelValue = NaN);
                }
            else n.voxelValue = NaN;
        }),
        (n.multiply = function (e, a) {
            for (var n = e.length, t = e[0].length, i = (a.length, a[0].length), l = Array(n), o = 0; o < n; ++o) {
                l[o] = Array(i);
                for (var c = 0; c < i; ++c) {
                    l[o][c] = 0;
                    for (var s = 0; s < t; ++s) l[o][c] += e[o][s] * a[s][c];
                }
            }
            return l;
        }),
        (n.updateCoordinates = function () {
            (coordVoxel = n.multiply(n.affine, [[n.numSlice.X + 1], [n.numSlice.Y + 1], [n.numSlice.Z + 1], [1]])), (n.coordinatesSlice.X = coordVoxel[0]), (n.coordinatesSlice.Y = coordVoxel[1]), (n.coordinatesSlice.Z = coordVoxel[2]);
        }),
        (n.init = function () {
            (n.widthCanvas.X = Math.floor(n.canvas.parentElement.clientWidth * (n.nbSlice.Y / (2 * n.nbSlice.X + n.nbSlice.Y)))),
                (n.widthCanvas.Y = Math.floor(n.canvas.parentElement.clientWidth * (n.nbSlice.X / (2 * n.nbSlice.X + n.nbSlice.Y)))),
                (n.widthCanvas.Z = Math.floor(n.canvas.parentElement.clientWidth * (n.nbSlice.X / (2 * n.nbSlice.X + n.nbSlice.Y)))),
                (n.widthCanvas.max = Math.max(n.widthCanvas.X, n.widthCanvas.Y, n.widthCanvas.Z)),
                (n.heightCanvas.X = Math.floor((n.widthCanvas.X * n.nbSlice.Z) / n.nbSlice.Y)),
                (n.heightCanvas.Y = Math.floor((n.widthCanvas.Y * n.nbSlice.Z) / n.nbSlice.X)),
                (n.heightCanvas.Z = Math.floor((n.widthCanvas.Z * n.nbSlice.Y) / n.nbSlice.X)),
                (n.heightCanvas.max = Math.max(n.heightCanvas.X, n.heightCanvas.Y, n.heightCanvas.Z)),
                n.canvas.width != n.widthCanvas.X + n.widthCanvas.Y + n.widthCanvas.Z &&
                    ((n.canvas.width = n.widthCanvas.X + n.widthCanvas.Y + n.widthCanvas.Z), (n.canvas.height = Math.round((1 + n.spaceFont) * n.heightCanvas.max)), (n.context = a(n.context, n.smooth))),
                (n.sizeFontPixels = Math.round(n.sizeFont * n.heightCanvas.max)),
                (n.context.font = n.sizeFontPixels + "px Arial"),
                (n.planes.canvasMaster.width = n.sprite.width),
                (n.planes.canvasMaster.height = n.sprite.height),
                (n.planes.contextMaster.globalAlpha = 1),
                n.planes.contextMaster.drawImage(n.sprite, 0, 0, n.sprite.width, n.sprite.height, 0, 0, n.sprite.width, n.sprite.height),
                n.overlay && ((n.planes.contextMaster.globalAlpha = n.overlay.opacity), n.planes.contextMaster.drawImage(n.overlay.sprite, 0, 0, n.overlay.sprite.width, n.overlay.sprite.height, 0, 0, n.sprite.width, n.sprite.height)),
                (n.planes.canvasX = document.createElement("canvas")),
                (n.planes.contextX = n.planes.canvasX.getContext("2d")),
                (n.planes.canvasX.width = n.nbSlice.Y),
                (n.planes.canvasX.height = n.nbSlice.Z),
                (n.planes.canvasY = document.createElement("canvas")),
                (n.planes.contextY = n.planes.canvasY.getContext("2d")),
                (n.planes.canvasY.width = n.nbSlice.X),
                (n.planes.canvasY.height = n.nbSlice.Z),
                (n.planes.canvasZ = document.createElement("canvas")),
                (n.planes.contextZ = n.planes.canvasZ.getContext("2d")),
                (n.planes.canvasZ.width = n.nbSlice.X),
                (n.planes.canvasZ.height = n.nbSlice.Y),
                n.planes.contextZ.rotate(-Math.PI / 2),
                n.planes.contextZ.translate(-n.nbSlice.Y, 0),
                n.updateValue(),
                n.updateCoordinates(),
                (n.numSlice.X = Math.round(n.numSlice.X)),
                (n.numSlice.Y = Math.round(n.numSlice.Y)),
                (n.numSlice.Z = Math.round(n.numSlice.Z));
        }),
        (n.draw = function (e, a) {
            var t,
                i,
                l = {},
                o = { X: "", Y: "", Z: "" };
            switch (((o.X = Math.ceil(((1 - n.sizeCrosshair) * n.nbSlice.X) / 2)), (o.Y = Math.ceil(((1 - n.sizeCrosshair) * n.nbSlice.Y) / 2)), (o.Z = Math.ceil(((1 - n.sizeCrosshair) * n.nbSlice.Z) / 2)), a)) {
                case "X":
                    (l.XW = n.numSlice.X % n.nbCol),
                        (l.XH = (n.numSlice.X - l.XW) / n.nbCol),
                        n.planes.contextX.drawImage(n.planes.canvasMaster, l.XW * n.nbSlice.Y, l.XH * n.nbSlice.Z, n.nbSlice.Y, n.nbSlice.Z, 0, 0, n.nbSlice.Y, n.nbSlice.Z),
                        n.crosshair &&
                            ((n.planes.contextX.fillStyle = n.colorCrosshair),
                            n.planes.contextX.fillRect(n.numSlice.Y, o.Z, 1, n.nbSlice.Z - 2 * o.Z),
                            n.planes.contextX.fillRect(o.Y, n.nbSlice.Z - n.numSlice.Z - 1, n.nbSlice.Y - 2 * o.Y, 1)),
                        (n.context.fillStyle = n.colorBackground),
                        n.context.fillRect(0, 0, n.widthCanvas.X, n.canvas.height),
                        n.context.drawImage(n.planes.canvasX, 0, 0, n.nbSlice.Y, n.nbSlice.Z, 0, (n.heightCanvas.max - n.heightCanvas.X) / 2, n.widthCanvas.X, n.heightCanvas.X),
                        n.title && ((n.context.fillStyle = n.colorFont), n.context.fillText(n.title, Math.round(n.widthCanvas.X / 10), Math.round(n.heightCanvas.max * n.heightColorBar + (1 / 4) * n.sizeFontPixels))),
                        n.flagValue &&
                            ((value = "value = " + Number.parseFloat(n.voxelValue).toPrecision(n.nbDecimals).replace(/0+$/, "")),
                            (valueWidth = n.context.measureText(value).width),
                            (n.context.fillStyle = n.colorFont),
                            n.context.fillText(value, Math.round(n.widthCanvas.X / 10), Math.round(n.heightCanvas.max * n.heightColorBar * 2 + (3 / 4) * n.sizeFontPixels))),
                        n.flagCoordinates &&
                            ((t = "x = " + Math.round(n.coordinatesSlice.X)),
                            (i = n.context.measureText(t).width),
                            (n.context.fillStyle = n.colorFont),
                            n.context.fillText(t, n.widthCanvas.X / 2 - i / 2, Math.round(n.canvas.height - n.sizeFontPixels / 2)));
                    break;
                case "Y":
                    for (n.context.fillStyle = n.colorBackground, n.context.fillRect(n.widthCanvas.X, 0, n.widthCanvas.Y, n.canvas.height), xx = 0; xx < n.nbSlice.X; xx++)
                        (posW = xx % n.nbCol), (posH = (xx - posW) / n.nbCol), n.planes.contextY.drawImage(n.planes.canvasMaster, posW * n.nbSlice.Y + n.numSlice.Y, posH * n.nbSlice.Z, 1, n.nbSlice.Z, xx, 0, 1, n.nbSlice.Z);
                    if (
                        (n.crosshair &&
                            ((n.planes.contextY.fillStyle = n.colorCrosshair),
                            n.planes.contextY.fillRect(n.numSlice.X, o.Z, 1, n.nbSlice.Z - 2 * o.Z),
                            n.planes.contextY.fillRect(o.X, n.nbSlice.Z - n.numSlice.Z - 1, n.nbSlice.X - 2 * o.X, 1)),
                        n.context.drawImage(n.planes.canvasY, 0, 0, n.nbSlice.X, n.nbSlice.Z, n.widthCanvas.X, (n.heightCanvas.max - n.heightCanvas.Y) / 2, n.widthCanvas.Y, n.heightCanvas.Y),
                        n.colorMap &&
                            !n.colorMap.hide &&
                            (n.context.drawImage(
                                n.colorMap.img,
                                0,
                                0,
                                n.colorMap.img.width,
                                1,
                                Math.round(n.widthCanvas.X + 0.2 * n.widthCanvas.Y),
                                Math.round((n.heightCanvas.max * n.heightColorBar) / 2),
                                Math.round(0.6 * n.widthCanvas.Y),
                                Math.round(n.heightCanvas.max * n.heightColorBar)
                            ),
                            (n.context.fillStyle = n.colorFont),
                            (label_min = Number.parseFloat(n.colorMap.min).toPrecision(n.nbDecimals).replace(/0+$/, "")),
                            (label_max = Number.parseFloat(n.colorMap.max).toPrecision(n.nbDecimals).replace(/0+$/, "")),
                            n.context.fillText(label_min, n.widthCanvas.X + 0.2 * n.widthCanvas.Y - n.context.measureText(label_min).width / 2, Math.round(n.heightCanvas.max * n.heightColorBar * 2 + (3 / 4) * n.sizeFontPixels)),
                            n.context.fillText(label_max, n.widthCanvas.X + 0.8 * n.widthCanvas.Y - n.context.measureText(label_max).width / 2, Math.round(n.heightCanvas.max * n.heightColorBar * 2 + (3 / 4) * n.sizeFontPixels))),
                        n.flagCoordinates &&
                            ((n.context.font = n.sizeFontPixels + "px Arial"),
                            (n.context.fillStyle = n.colorFont),
                            (t = "y = " + Math.round(n.coordinatesSlice.Y)),
                            (i = n.context.measureText(t).width),
                            n.context.fillText(t, n.widthCanvas.X + n.widthCanvas.Y / 2 - i / 2, Math.round(n.canvas.height - n.sizeFontPixels / 2))),
                        void 0 !== n.showLR && n.showLR)
                    ) {
                        var c = n.radiological || !1,
                            s = Math.round(1 * n.sizeFontPixels),
                            r = Math.round(n.canvas.height / 2),
                            h = n.context.font,
                            v = n.context.textAlign,
                            d = n.context.textBaseline;
                        (n.context.font = s + "px Arial"), (n.context.textAlign = "center"), (n.context.textBaseline = "middle"), (n.context.fillStyle = n.colorFont);
                        var x = c ? "R" : "L";
                        n.context.fillText(x, n.widthCanvas.X + 40, r);
                        var S = c ? "L" : "R";
                        n.context.fillText(S, n.widthCanvas.X + n.widthCanvas.Y - 40, r), (n.context.font = h), (n.context.textAlign = v), (n.context.textBaseline = d);
                    }
                    break;
                case "Z":
                    for (n.context.fillStyle = n.colorBackground, n.context.fillRect(n.widthCanvas.X + n.widthCanvas.Y, 0, n.widthCanvas.Z, n.canvas.height), xx = 0; xx < n.nbSlice.X; xx++)
                        (posW = xx % n.nbCol),
                            (posH = (xx - posW) / n.nbCol),
                            n.planes.contextZ.drawImage(n.planes.canvasMaster, posW * n.nbSlice.Y, posH * n.nbSlice.Z + n.nbSlice.Z - n.numSlice.Z - 1, n.nbSlice.Y, 1, 0, xx, n.nbSlice.Y, 1);
                    if (
                        (n.crosshair && ((n.planes.contextZ.fillStyle = n.colorCrosshair), n.planes.contextZ.fillRect(o.Y, n.numSlice.X, n.nbSlice.Y - 2 * o.Y, 1), n.planes.contextZ.fillRect(n.numSlice.Y, o.X, 1, n.nbSlice.X - 2 * o.X)),
                        n.context.drawImage(n.planes.canvasZ, 0, 0, n.nbSlice.X, n.nbSlice.Y, n.widthCanvas.X + n.widthCanvas.Y, (n.heightCanvas.max - n.heightCanvas.Z) / 2, n.widthCanvas.Z, n.heightCanvas.Z),
                        n.flagCoordinates &&
                            ((t = "z = " + Math.round(n.coordinatesSlice.Z)),
                            (i = n.context.measureText(t).width),
                            (n.context.fillStyle = n.colorFont),
                            n.context.fillText(t, n.widthCanvas.X + n.widthCanvas.Y + n.widthCanvas.Z / 2 - i / 2, Math.round(n.canvas.height - n.sizeFontPixels / 2))),
                        void 0 !== n.showLR && n.showLR)
                    ) {
                        var c = n.radiological || !1,
                            s = Math.round(1 * n.sizeFontPixels),
                            r = Math.round(n.canvas.height / 2),
                            h = n.context.font,
                            v = n.context.textAlign,
                            d = n.context.textBaseline;
                        (n.context.font = s + "px Arial"), (n.context.textAlign = "center"), (n.context.textBaseline = "middle"), (n.context.fillStyle = n.colorFont);
                        var x = c ? "R" : "L";
                        n.context.fillText(x, n.widthCanvas.X + n.widthCanvas.Y + 35, r);
                        var S = c ? "L" : "R";
                        n.context.fillText(S, n.widthCanvas.X + n.widthCanvas.Y + n.widthCanvas.Z - 35, r), (n.context.font = h), (n.context.textAlign = v), (n.context.textBaseline = d);
                    }
            }
        }),
        (n.clickBrain = function (e) {
            var a,
                t,
                i = n.canvas.getBoundingClientRect(),
                l = e.clientX - i.left,
                o = e.clientY - i.top;
            l < n.widthCanvas.X
                ? ((a = Math.round((n.nbSlice.Y - 1) * (l / n.widthCanvas.X))),
                  (t = Math.round(((n.nbSlice.Z - 1) * ((n.heightCanvas.max + n.heightCanvas.X) / 2 - o)) / n.heightCanvas.X)),
                  (n.numSlice.Y = Math.max(Math.min(a, n.nbSlice.Y - 1), 0)),
                  (n.numSlice.Z = Math.max(Math.min(t, n.nbSlice.Z - 1), 0)))
                : l < n.widthCanvas.X + n.widthCanvas.Y
                ? ((l -= n.widthCanvas.X),
                  (sx = Math.round((n.nbSlice.X - 1) * (l / n.widthCanvas.Y))),
                  (t = Math.round(((n.nbSlice.Z - 1) * ((n.heightCanvas.max + n.heightCanvas.X) / 2 - o)) / n.heightCanvas.X)),
                  (n.numSlice.X = Math.max(Math.min(sx, n.nbSlice.X - 1), 0)),
                  (n.numSlice.Z = Math.max(Math.min(t, n.nbSlice.Z - 1), 0)))
                : ((l = l - n.widthCanvas.X - n.widthCanvas.Y),
                  (sx = Math.round((n.nbSlice.X - 1) * (l / n.widthCanvas.Z))),
                  (a = Math.round(((n.nbSlice.Y - 1) * ((n.heightCanvas.max + n.heightCanvas.Z) / 2 - o)) / n.heightCanvas.Z)),
                  (n.numSlice.X = Math.max(Math.min(sx, n.nbSlice.X - 1), 0)),
                  (n.numSlice.Y = Math.max(Math.min(a, n.nbSlice.Y - 1), 0))),
                n.updateValue(),
                n.updateCoordinates(),
                n.drawAll(),
                n.onclick && n.onclick(e);
        }),
        (n.drawAll = function () {
            n.draw(n.numSlice.X, "X"), n.draw(n.numSlice.Y, "Y"), n.draw(n.numSlice.Z, "Z");
        }),
        n.canvas.addEventListener("click", n.clickBrain, !1),
        n.canvas.addEventListener(
            "mousedown",
            function (e) {
                n.canvas.addEventListener("mousemove", n.clickBrain, !1);
            },
            !1
        ),
        n.canvas.addEventListener(
            "mouseup",
            function (e) {
                n.canvas.removeEventListener("mousemove", n.clickBrain, !1);
            },
            !1
        ),
        n.sprite.addEventListener("load", function () {
            n.init(), n.drawAll();
        }),
        n.overlay &&
            n.overlay.sprite.addEventListener("load", function () {
                n.init(), n.drawAll();
            }),
        n.init(),
        n.drawAll(),
        n
    );
}

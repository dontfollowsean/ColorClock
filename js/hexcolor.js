function refreshClock()	{
	x = 1;  // x = seconds
	var d = new Date()
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();

	if (h<=9) {h = '0'+h};
	if (m<=9) {m = '0'+m};
	if (s<=9) {s = '0'+s};

	var	hexColor = '#'+h+m+s;
    var rgb = hexToRgb(hexColor);
    var hsl = rgbToHsl(rgb);

    
    compliment(hexColor,hsl);
    //triad(hexColor,hsl);

    $("#clock").text(h+':'+m+':'+s);
    setTimeout(refreshClock, x*1000);
}

function triad(hexColor,hsl){
    var triHsl = getTriad(hsl);
    var tri0 = hslToRgb(triHsl[0]);
    var tri1 = hslToRgb(triHsl[1]);

    var r0 = Math.round(tri0[0]).toString(16);
    var g0 = Math.round(tri0[1]).toString(16);
    var b0 = Math.round(tri0[2]).toString(16);

    var r1 = Math.round(tri1[0]).toString(16);
    var g1 = Math.round(tri1[1]).toString(16);
    var b1 = Math.round(tri1[2]).toString(16);

    if(r1<=9) {r1 = '0' + r1};
    if(g1<=9) {g1 = '0' + g1};
    if(b1<=9) {b1 = '0' + b1};
    if(r0<=9) {r0 = '0' + r0};
    if(g0<=9) {g0 = '0' + g0};
    if(b0<=9) {b0 = '0' + b0};

    var color0 = '#' + r0 + g0 + b0; 
    var color1 = '#' + r1 + g1 + b1; 

    $("#b").css("background-color", color0 );
    $("#clock").css("background-color", hexColor );
    $("#jumbo").css("background-color", color1 );

}

function compliment(hexColor,hsl){
    var compHsl = getCompliment(hsl);
    var compRgb = hslToRgb(compHsl);
    var cR = Math.round(compRgb[0]).toString(16);
    var cG = Math.round(compRgb[1]).toString(16);
    var cB = Math.round(compRgb[2]).toString(16);

    if(cR<=9) {cR = '0' + cR};
    if(cG<=9) {cG = '0' + cG};
    if(cB<=9) {cB = '0' + cB};

    var compColor = '#'+ cR + cG + cB; 

    $("#b").css("background-color", compColor );
    $("#jumbo").css("background-color", hexColor );
    $("#clock").css("background-color", hexColor );
    
}

function hslToRgb(hsl){
    //(1,1,1) -> (255,255,255)
    var r,g,b, x,y ;
    // Input is HSL value of complementary colour, held in $h2, $s, $l as fractions of 1
    // Output is RGB in normal 255 255 255 format, held in $r, $g, $b
    // Hue is converted using function hue_2_rgb, shown at the end of this code

    if(hsl[1]===0){
        r = hsl[2] * 255;
        g = hsl[2] * 255
        b = hsl[2] * 255
    }
    else{
        if (hsl[2]<0.5){
            y = hsl[2] * (1 + hsl[1]);
        }
        else{
            y = (hsl[2] + hsl[1]) - (hsl[2] * hsl[1])
        }
        x = 2 * hsl[2] - y;
        r = 255 * hueToRgb(x,y,hsl[0]+(1/3));
        g = 255 * hueToRgb(x,y,hsl[0]);
        b = 255 * hueToRgb(x,y,hsl[0]-(1/3));
    }

    var rgb = [r,g,b];
   return rgb;
   }
function hueToRgb(a,b,h){
    if(h < 0){
        h += 1;
    }
    if(h > 1){
        h -= 1;
    }
    if((6 * h) < 1){
        return (a + (b - a) * 6 * h);
    }
    if((2 * h) < 1){
        return b;
    }
    if((3 * h) < 2){
        return (a + (b - a) * ((2 /3 - h) * 6));
    }

    return a;
}

   function rgbToHsl(rgb){
    //(1,1,1)->(1,1,1)
    var max = Math.max.apply(Math, rgb);
    var min = Math.min.apply(Math, rgb);
    var delMax = max - min;

    var l = ( max + min ) / 2;
    var h,s;

    if(delMax===0){
        h = 0;
        s = 0;
    }
    else{
        if(l < 0.5){
            s = delMax / (max+min);
        }
        else{
            s = delMax / ( 2 - max - min );
        }

        var delR = (((max - rgb[0]) / 6) + (delMax / 2)) / delMax;
        var delG = (((max - rgb[1]) / 6) + (delMax / 2)) / delMax;
        var delB = (((max - rgb[2]) / 6) + (delMax / 2)) / delMax;


        if(rgb[0]===max){
            h = delB - delG;
        }
        else if(rgb[1]===max){
            h = (1/3) + delR - delB;
        } else if(rgb[2]===max){
            h = (2/3) + delG - delR;
        }

        if(h<0){
            h += 1;
        }
        if(h>0){
            h-=1
        }

    }   

    var hsl = [h,s,l];

    return hsl;
}

function hexToRgb(hexVal){
    //#FFFFFF->(1,1,1)
    var redHex   = '0x'+hexVal.substr(1,2);
    var blueHex  = '0x'+hexVal.substr(3,2);
    var greenHex = '0x'+hexVal.substr(5);

    var r = (redHex.toString(10) / 255) ;//scaled to last whole day
    var g = (blueHex.toString(10) / 255) ;
    var b = (greenHex.toString(10) / 255) ;


    var rgb = [r,g,b];

    return rgb;
}   

function getCompliment(hsl){
    //(1,1,1)
    var h = hsl[0] + 0.5;
    if(h>1){
        h -= 1; 
    }
    var c = [h, hsl[1], hsl[2]];
    return c;
}
function getTriad(hsl){
    //(1,1,1)
    var h1 = hsl[0] + (1/3);
    if(h1>1){
        h1 -= 1; 
    }
    var h2 = h1 + (1/3);
    if(h2>1){
        h2 -= 1; 
    }    

    var hsl1 =[h1,hsl[1],hsl[2]];
    var hsl2 =[h2,hsl[1],hsl[2]];

    return [hsl1,hsl2];
}

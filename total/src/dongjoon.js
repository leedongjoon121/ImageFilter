/* 
* Producer Introduce 
 -name :  Dongjoonlee 
 -nation : south korea
 -date of birth : 1993.04.06
 -univ : gachon university
 -email : ehdwns46@naver.com
 -day of production : 2016.07.15~ 2016.08.30
 -Supervisor : Heohyeon of Hancom inc. , DaHyunkim of Hancom inc. 
 

* reference Licence 
 1번. Created for the purposes of Multimedia Technology Course
      CS AUEB 2014-2015
      Stavropoulos Konstantinos #3100172 -- Contact
 2번. Free
*/

// ------------------------------------------------------------------------ ui_black_white ------------------------------------------------------------------------ 
// Licence = 1번
function Ori_BlackandWhite(px) {
    var data = px;
    for (var i = 0, n = data.length; i < n; i += 4) {
        var blackandwhite = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2] >= 128) ? 255 : 0;
        data[i] = blackandwhite;
        data[i + 1] = blackandwhite;
        data[i + 2] = blackandwhite;
    } };

// ------------------------------------------------------------------------ ui_brightness ------------------------------------------------------------------------ 
// Licence = 1번
function Ori_BringhtnessFT(valueC, px) {
    var brightness = valueC;
    for (var i = 0; i < px.length; i += 4) {
        for (var n = i; n < i + 3; n++) {
            if (px[n] + brightness < 0) {
                px[n] = 0;
            }
            else if (px[n] + brightness > 255) {
                px[n] = 255;
            }
            else {
                px[n] += brightness;
            } } } };

// ------------------------------------------------------------------------ ui_contrast ------------------------------------------------------------------------ 
// Licence = 1번
function Ori_contrast(value, px) { // value 가 마우스 포인터
    var data = px;
    var factor = (259 * (value + 255)) / (255 * (259 - value));
    for (var i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
    } };

// ------------------------------------------------------------------------ ui_grayscale ------------------------------------------------------------------------ 
// Licence = 1번
function Ori_GrayscaleFT(binaryData, l) {
    for (var i = 0; i < l; i += 4) {
        var r = binaryData[i];
        var g = binaryData[i + 1];
        var b = binaryData[i + 2];
        var luminance = r * 0.21 + g * 0.71 + b * 0.07;
        binaryData[i] = luminance;
        binaryData[i + 1] = luminance;
        binaryData[i + 2] = luminance;
    } };

// ------------------------------------------------------------------------ ui_neon ------------------------------------------------------------------------ 
// Licence = 2번(Free)
var Ori_drawShadow = function (targetContext, imageObj, alpha, color, x, y, blur) { //shadow 처리를 하기위한 함수
    targetContext.save();
    targetContext.globalAlpha = alpha; // 사용자가 선택한 스크롤 포인터의 값을 globalAlpha 메서드에 대입하여 opacity를 조정함 
    targetContext.shadowColor = color; // 사용자가 선택한 이미지의 color를 shadowcolor 메서드에 대입하여 shadow color 조절
    targetContext.shadowBlur = blur; // 사용자가 선택한 스크롤 포인터 값을 shadowBlur 메서드에 대입하여 neon값을 조절함 
    targetContext.drawImage(imageObj, x, y);
    targetContext.restore();
};

function Ori_DoNeon(targetContext, imageObj, blur, alpha, color) { // neon 값을 처리하는 함수 
    console.log('filter_convert_button');
    
    var alpha = alpha / 10; // alpha값을 10으로 나누어, globalAlpha 메서드에 0 ~ 1 사이의 float값을 대입
    var classficationblur = blur / 10; // 10번을 그리는데, 순차적으로 작은거부터 큰거 로 그리는 -> 찐해짐 
    var blurOffset = parseFloat(blur) / 2;
    // shadow를 여러번 그려서 neon 효과를 표현함 
    Ori_drawShadow(targetContext, imageObj, alpha, color, classficationblur * 1);    
    for(var count = 1; count<=10; count++){
    Ori_drawShadow(targetContext, imageObj, alpha, color, blurOffset, blurOffset, classficationblur * count);
    }
    targetContext.save();
    targetContext.drawImage(imageObj, blurOffset, blurOffset);
    targetContext.restore();
     };

// ------------------------------------------------------------------------ ui_reflection ------------------------------------------------------------------------
// Licence = 2번(Free)
function Ori_reflection(cimage, oImage, padding, control, gradient) {
    // 사용자가 버튼을 통해 선택한 인자값들을 바탕으로 reflection을 나타냄 
    control = parseFloat(control); // control값은 addstop값으로써 0~1사이의 값이므로 소수점으로 표현해 주어야 한다.
    var cContext = cimage.getContext('2d');
    cContext.save();
    cContext.drawImage(oImage, 0, 0); // convert image를 draw 
    cContext.restore();
    cContext.save();
    // 원본 이미지 밑에서부터 그려야하기때문에 높이 값을 이렇게 설정해주고
    cContext.scale(1, -1.0); // scale 메서드를 이용해 y값에 음수를 주어 원본 이미지에 뒤집은 값을 표현한다.
    cContext.drawImage(oImage, 0, -(oImage.height * 2 + padding), oImage.width, oImage.height); // reflection 되는 값을 그리는데, padding값만큼 추가로 위치를 조절해서 그려준다.
    cContext.restore();
    // get image pixels and brightness, 밝기 조절을 하는 부분
    var imageData = cContext.getImageData(0, 0, cimage.width, cimage.height); // reflection될 부분의 image를 불러와서 imageData 변수에 저장하고
    var px = imageData.data; // 그 값을 image pixel로 변환하고
    con_reflection(+100, px); // 밝기 조절 알고리즘을 통해 100만큼 밝기를 증가시키고
    cContext.putImageData(imageData, 0, 0); // 증가된 imageData를 다시 출력해준다.
    // make mask canvas , 마스크값을 형성 하는 부분
    var mask = document.createElement('canvas');
    var mask_context = mask.getContext('2d');
    mask.width = cimage.width;
    mask.height = cimage.height;
    // gradient
    if (gradient) { // DataStore의 gradient값이 true인 경우를 사용자가 클릭하였을 경우 각각에 해당하는 control 변수에 맞춰 gradient를 변환 시킨다.
        var gradient = cContext.createLinearGradient(0, 0, 0, oImage.height); // Linear하게 값이 적용되므로 reflection 되는 부분에 대한 값을 createLinearGradient 메서드를 이용해 설정해주고
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(control, 'red'); // control 값에 따라 gradient 위치를 설정해준뒤,
        gradient.addColorStop(1, 'red');
        mask_context.fillStyle = gradient; // 생성해놓은 마스크 값에 style을 대입하고
        mask_context.fillRect(0, 0, oImage.width, oImage.height); // 본격적으로 크기에 맞게 그려준다.
        cContext.globalCompositeOperation = 'destination-out'; // 도형 합성 API로써  기존 도형에서, 새 도형과 겹치는 부분은 사라지고, 겹치지 않는 부분만 남긴다.
    }
    // masking    
    cContext.drawImage(mask, 0, oImage.height + padding); // 만들어진 mask값을 convert 이미지에 대입시켜준다 .
}

function con_reflection(valueC, px) { //이미 구현된 라이브러리에 의한 알고리즘 이므로 설명 생략
    var brightness = valueC;
    for (var i = px.length / 2; i < px.length; i += 4) {
        for (var n = i; n < i + 3; n++) {
            if (px[n] + brightness < 0) {
                px[n] = 0;
            }
            else if (px[n] + brightness > 255) {
                px[n] = 255;
            }
            else {
                px[n] += brightness;
            } } } };

// ------------------------------------------------------------------------ ui_shadow ------------------------------------------------------------------------
// Licence = 2번(Free)
function Ori_Draw_shadow(targetContext, imageObj, shadow_offsetX, shadow_offsetY, Blur_value, shadow_offset) {
    // 사용자가 버튼을 클릭하여 해당하는 shadow_offset의 X,Y좌표 에 따라 각각 다른 shadow 위치를 표현한다.
    console.log('filter_convert_button');
    targetContext.shadowColor = '#8C8C8C'; // 설정해 놓은 shadow color, 회색
    targetContext.shadowOffsetX = shadow_offsetX;
    targetContext.shadowOffsetY = shadow_offsetY; // 사용자가 선택한 shadow의 x,y 좌표로 적용시킨다.
    targetContext.shadowBlur = Blur_value; // 사용자가 선택한 blur값을 적용 시킨다.
    targetContext.drawImage(imageObj, shadow_offset + (Blur_value * 1.2), shadow_offset + (Blur_value * 1.2));
    // 적용된 값을 가지고 이미지를 draw 한다.
};

function Ori_middle_Draw_shadow(targetContext, imageObj, shadow_offset, Blur_value) {
    // 가운데 shadow 를 나타내기 위한 함수 
    console.log('filter_convert_button');
    var grade = 20;
    var pos = Blur_value / grade;
    for(var x = -1; x<=1; x++){
      for(var y = -1; y<= 1; y++){
        targetContext.save();
        targetContext.shadowColor = '#8C8C8C';
        targetContext.shadowOffsetX = pos * x;
        targetContext.shadowOffsetY = pos * y;
        targetContext.shadowBlur = Blur_value;
        targetContext.drawImage(imageObj, shadow_offset + (Blur_value * 1.2), shadow_offset + (Blur_value * 1.2));
        targetContext.restore();
        } } };

// ------------------------------------------------------------------------ Soft Edge ------------------------------------------------------------------------
// Licence = 2번(Free)
function middle_Draw_shadow(targetContext, imageObj, shadow_offset, Blur_value) {
    
    console.log('filter_convert_button');
    var grade = 20;
    for(var x = -1; x<=1; x++){
      for(var y = -1; y<= 1; y++){
        targetContext.save();
        targetContext.shadowColor = '#8C8C8C';
        targetContext.shadowOffsetX = pos * x;
        targetContext.shadowOffsetY = pos * y;
        targetContext.shadowBlur = Blur_value;
        targetContext.drawImage(imageObj, shadow_offset + (Blur_value * 1.2), shadow_offset + (Blur_value * 1.2));
        targetContext.restore();
        } } };
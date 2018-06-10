window.onload = function(){
	var can = document.getElementById("canvas");
	var ctx = can.getContext("2d");
	var file = document.getElementById('file');

	var canvasWidth = 400;
	var canvasHeight = 300;
	var uploadImgSrc;
	var img = new Image();

	// Canvasの準備
	can.width = canvasWidth;
	can.height = canvasHeight;

	// ファイルが指定された時にloadLocalImage()を実行
	file.addEventListener('change', loadLocalImage, false);

	var count = 0;
	ctx.font = "120px '游ゴシック', sans-serif";

	var timer
	animate();
	
	function animate() {
		clearInterval(timer);
		
		timer = setInterval(function(){
			ctx.fillStyle="#fff"; 
			ctx.clearRect(0,0,canvasWidth,canvasHeight);
			ctx.drawImage(img, 0, 0, canvasWidth, img.height * (canvasWidth / img.width));
			h = count
			ctx.strokeStyle = 'rgb(' + hsvToRgb(h*15 % 360, 1, 1).join(",") + ')';
			ctx.strokeText("アメ", 80, 120);
			ctx.strokeText("リカ", 80, 240);
			count++;
		},30);

	}
	
	function loadLocalImage(e) {
	    // ファイル情報を取得
	    var fileData = e.target.files[0];

	    // 画像ファイル以外は処理を止める
	    if(!fileData.type.match('image.*')) {
	        alert('画像を選択してください');
	        return;
	    }

	    // FileReaderオブジェクトを使ってファイル読み込み
	    var reader = new FileReader();
	    // ファイル読み込みに成功したときの処理
	    reader.onload = function() {
	        // Canvas上に表示する
	        uploadImgSrc = reader.result;
	        img.src = uploadImgSrc;
	    	animate();
	    }
	    // ファイル読み込みを実行
	    reader.readAsDataURL(fileData);
	}
	
}

function hsvToRgb(H,S,V) {
    //https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

    var C = V * S;
    var Hp = H / 60;
    var X = C * (1 - Math.abs(Hp % 2 - 1));

    var R, G, B;
    if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
    if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
    if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
    if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
    if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
    if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

    var m = V - C;
    [R, G, B] = [R+m, G+m, B+m];

    R = Math.floor(R * 255);
    G = Math.floor(G * 255);
    B = Math.floor(B * 255);

    return [R ,G, B];
}
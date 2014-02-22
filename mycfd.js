var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// ctx.fillStyle = "rgba(0,0,0,255)";
// ctx.fillRect(0,0,600,600);	//background


var N = 500;//dimension
var size = N*N
var diff = 0; //扩散速率
var dt = 1;	//time step
var s = [];	//source
var x = [];	//density
var u = []; //speed of x-axis
var v = [];	//speed of y-axis


var imgData = ctx.createImageData(N,N);	//获取ImageData
ctx.fillStyle = "rgba(0,0,0,255)";
ctx.fillRect(0,0,N,N);	//background


for (var i=0; i<size; i++) {
	u[i] = 0; v[i] = 0; x[i] = 0;
}
for (i = 100; i<300; i++){
	for (var j=100; j<200; j++) {
		s[ix(i,j)] = 1;
	}
}	//initialize 

//alert(s[IX(500,250)]);

function ix(i,j) {    //用来将二维数组化为一维数组
	return i*N+j;
}

/******************1.1: add source into density matrix***************/
function addSor() {	
	for (var i=0; i<size; i++){
		x[i] = x[i] + s[i];
	}
}

/******************1.2：diffuse*???????????????????************************************/
function diffuse() {
	var a = 0  	//????????????????
	for (var i = 1; i < N; i++) {
		for (var j = 1; j < N; j++) {
//			x[ix(i,j)] = (x[ix(i,j)] + a*(x[ix(i-1,j)]+x[ix(i+1,j)]+x[ix(i,j-1)]+x[ix(i,j+1)])) / (1 +4*a)
			x[ix(i,j)] = x[ix(i,j)]  + a * (x[ix(i-1,j)] + x[ix(i+1,j)] + x[ix(i,j-1)] + x[ix(i,j+1)] - 4 * x[ix(i,j)]);
		}
	}
}

/************1.3: advect： force the density to follow velocity field*/
function advect () {
	var i0,j0;
	for (var i=1; i < N; i++) {
		for (var j=1; j<N; j++) {
			i0 = i - u[ix(i,j)];
			j0 = j - v[ix(i,j)];	//由速度场找到ij的前身
			if(i0 >= 0 & i0 <= N & j0 >=0 & j0 <= N) {
				x[ix(i,j)] = x[ix(i0,j0)];
			}
			else x[ix(i,j)] = 0;
		}
	}
}
/**************1.0：density step ：组合前面工作**********************/
function dens_step() {
	addSor();
	diffuse();
//	advect();
	var blue;
	for(var i = 0; i <size; i++) {
		blue = Math.ceil(x[i] * 255);
		imgData.data[i*4 + 0] = 0;
		imgData.data[i*4 + 1] = 0;
		imgData.data[i*4 + 2] = blue;
		imgData.data[i*4 + 3] = 255;
	}
	ctx.putImageData(imgData,0,0);
}
dens_step();

//setInterval(dens_step, 1000);


// addSor();
// diffuse();
// var blue;
// alert(imgData.data.length);
// for (var i=0;i<imgData.data.length;i+=4)
  // {
  // blue = Math.ceil(x[i] * 255);
  // imgData.data[i+0]=0;
  // imgData.data[i+1]=0;
  // imgData.data[i+2]=255;
  // imgData.data[i+3]=255;
  // }
// ctx.putImageData(imgData,0,0);
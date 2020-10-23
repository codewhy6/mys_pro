function orignJ(M)
{var J=[];for(var i=0;i<M*M;i++)
{J[i]=i;}
return J;}
function installshuffleJ(M)
{_J=shuffle(M);while(!judgeJ(M,_J))
{_J=shuffle(M);}
return _J;}
function shuffle(M)
{var J=orignJ(M);var j,x,i=J.length;while(i)
{j=parseInt(Math.random()*i);x=J[--i];J[i]=J[j];J[j]=x;}
return J;}
function judgeJ(M,J)
{var Js=nixushu(J);var J0=jd0(M,J);var _J=nixu(J);var _Js=nixushu(_J);var _J0=jd0(M,_J);if(((_Js+_J0)%2==0)&&((Js+J0)%2==0))
{return true;}
else
{return false;}}
function nixu(J)
{var _J=[];for(var i=J.length-1,j=0;i>=0;i--,j++)
{_J[j]=J[i];}
return _J;}
function nixushu(J)
{var o=[];var n=J.length;var c=0;for(var b=0,i=0;i<n;i++,b++)
{o[b]=0;for(var j=0;j<i;j++)
{if(J[j]>J[i])
{o[b]=o[b]+1;}}}
for(var a=0;a<n;a++)
{c+=o[a];}
return c;}
function jd0(M,J)
{for(var i=1,j=0;i<=M;i++)
{for(var b=1;b<=M;b++,j++)
{if(J[j]==0)
{return i+b;}}}}
function setBackground(M,_J)
{var bg=[];var i=0;for(var j=1;j<=M;j++)
{for(var k=1;k<=M;k++)
{bg[i]="url("+urlimg+") "+-(k-1)*100+"px "+-(j-1)*100+"px no-repeat";i++;}}
for(var i=0;i<_J.length;i++)
{var li=document.createElement("li");nav.appendChild(li);li.style.background=bg[_J[i]];li.className="li"+i;li.id="li"+_J[i];}
document.getElementById("li0").style.background="#fff";}
function canmove(moveblock)
{var n=moveblock.getAttribute("class");var m=document.getElementById("li0").getAttribute("class");var x=parseInt(n.substring(2,n.length));var z=parseInt(m.substring(2,m.length));if(x-1==z||x+1==z||x+3==z||x-3==z)
return true;else return false;}
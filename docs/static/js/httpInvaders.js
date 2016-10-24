/*
 Http-Invaders (de-Matrix-ing the Http-Status-Code)
 (c) 2012-2013 N. Landsteiner, www.masswerk.at
 all rights reserved.
*/
var HttpInvaders=new function(){var gridCode,gridCodeWidth,gridCodeHeight,gridCodeTop,gridCodeLeft,gridCodeRight,displayRight,gridCodeBottom,invBaseLine,shipBaseLine,shipStartLine,displayBottom,scoreDisplayTop,scoreDisplayWidth,atmDtctY1,atmDtctY2,gridCols,isTouch,isMSTouch,evntTouchStart,evntTouchEnd,evntTouchMove,evntTouchCancel;function setGridCode(code){var d0,d1,d2,r;if(gridCode)return false;code=String(code);if(!code.match(/^[0-9]{3}$/)||code=='000')code='WTF';gridCode=new Array();d0=gridDigits[code.charAt(0)];d1=gridDigits[code.charAt(1)];d2=gridDigits[code.charAt(2)];for(r=0;r<24;r++){gridCode[r]=d0[r]+gridSpacer+d1[r]+gridSpacer+d2[r];}
gridCols=gridCode[0].length;gridCodeWidth=gridCols*8;gridCodeHeight=gridCode.length*8;gridCodeTop=200;gridCodeLeft=24;gridCodeRight=gridCodeLeft+gridCodeWidth;displayRight=gridCodeRight+24;gridCodeBottom=gridCodeTop+gridCodeHeight;invBaseLine=36;shipBaseLine=gridCodeBottom+32;shipStartLine=shipBaseLine+32;displayBottom=shipStartLine+24;scoreDisplayTop=displayBottom+12;scoreDisplayWidth=100;return true;}
var invSpeed=5,invDelayMax=100,invDelayMin=29,shipSpeed=2,shipDelay=25,autoMoveDelay=10000,bombsMax=8,shotSpeed=6,bombSpeed=4,bombDropDelayCnt=5,livesMax=7,initialLives=2,motherShipSpeed=2
motherShipDelay=37,bonusLifeScore=2000;var grid=new Array(),gridElements=new Object(),livesIcons=new Array(),lives,ship,shot,invaders=new Array(),bombs=new Array(),invadersDx,rightInvader,leftInvader,step,invDelay,invBottomLine,bombsAvailable,bombProbability,gameOn,shipDx,firstBomb,shoot,score,motherShip,gameMessage,autoMove,autoMoveTimer,invadersTimer,shipTimer,motherShipTimer,motherShipDx,wave,lastMoveKey,scoreDisplay,nextBonusScore,atmDtctDx,invadersLeft,invBottom,invTop,invMoveDown,invMoveDownCnt,automatonSetting,atmDtctRange,atmDtctProbability,atmDtctRcvrProbability,atmDtctFuzzyRange,invadersDy;var gridSpacer='     ';var gridDigits={'0':['   1fffffff8   ',' 3fffffffffffc ','fffffffffffffff','fffffffffffffff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffffffffffffff','fffffffffffffff',' 3fffffffffffc ','   1fffffff8   '],'1':['      3ff8     ','     1fff8     ','    7ffff8     ','  fffffff8     ','  fffffff8     ','  fffffff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','     3fff8     ','3fffffffffffff8','3fffffffffffff8','3fffffffffffff8'],'2':['   1fffffff8   ',' 1fffffffffff8 ','1fffffffffffff8','3fffffffffffffc','3fff      7fffc','          1fffc','          1fffc','          3fffc','          ffff ','         3fffc ','        3ffff  ','       3ffff   ','      3ffff    ','     3ffff     ','    3ffff      ','   3ffff       ','  3ffff        ',' 3ffff8        ',' ffffc         ','3ffff          ','7fffe          ','7fffffffffffffc','7fffffffffffffc','7fffffffffffffc'],'3':[' fffffffffffff ',' fffffffffffff ',' fffffffffffff ','          ffff ','         1fffe ','         7fff8 ','        1fffe  ','        ffff   ','       7fff8   ','      ffffe    ','      ffffe    ','       7fff8   ','        7fff8  ','         ffff  ','         3fffc ','          ffff ','          7fff8','          3fffc','3fff8     3fffc','3fffc     7fff8',' ffff8   3ffff ',' 1fffffffffffc ','  1fffffffff8  ','   1fffffff8   '],'4':['    3fffc      ','    7fff8      ','    ffff       ','   1fffe       ','   3fffc       ','   7fff8       ','   ffff        ','  1fffe        ','  3fffc        ','  7fff8        ','  ffff         ',' 1fffe         ',' 3fffc   3fff8 ',' 7fff8   3fff8 ',' ffff    3fff8 ','1fffffffffffffc','3fffffffffffffc','3fffffffffffffc','3fffffffffffffc','         3fff8 ','         3fff8 ','         3fff8 ','         3fff8 ','         3fff8 '],'5':[' 1ffffffffffffc',' 1ffffffffffffc',' 1ffffffffffffc',' 3fffc         ',' 3fffc         ',' 3fffc         ',' 7fff8         ',' 7fff8         ',' 7fff8         ',' fffffffffff   ',' ffffffffffff  ','1ffffffffffffe ','         7ffff8','          7fffc','          3fffc','          3fffc','          3fffc','          3fffc','          3fffc','3fff8     7fff8','3fffc    3ffff ',' ffffffffffffc ',' 1ffffffffff8  ','  1ffffffff8   '],'6':['    7fffc      ','   1ffff       ','   7fffc       ','  1ffff        ','  7fffc        ',' 1ffff         ',' 3fffe         ',' 7fffc         ',' ffff8         ','1ffff          ','3fffe          ','7fffffffffffc  ','fffffffffffffe ','ffffffffffffffe','ffff      1ffff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','ffff       ffff','7fffffffffffffe','1fffffffffffff8',' 1fffffffffff8 ','   fffffffff   '],'7':['3fffffffffffff8','3fffffffffffff8','3fffffffffffff8','          7fff8','         1fffe ','         7fff8 ','        1fffe  ','        7fff8  ','       1fffe   ','       7fff8   ','      1fffe    ','      7fff8    ','     1fffe     ','     7fff8     ','     ffff      ','    1fffe      ','    3fffc      ','    3fffc      ','    3fffc      ','    3fffc      ','    3fffc      ','    3fffc      ','    3fffc      ','    3fffc      '],'8':['   1fffffff8   ',' 3fffffffffffc ','7fffffffffffffe','fffffffffffffff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','7fff       fffe',' fffffffffffff ','  3fffffffffc  ',' fffffffffffff ','7fff       fffe','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffffffffffffff','7fffffffffffffe',' 3fffffffffffc ','   1fffffff8   '],'9':['   fffffffff   ',' 1fffffffffff8 ','1fffffffffffff8','7fffffffffffffe','ffff       ffff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','ffff8      ffff','7ffffffffffffff',' 7fffffffffffff','  1fffffffffffe','          7fffc','         1ffff ','         7fffc ','        1ffff  ','        7fffc  ','       1ffff   ','       7fffc   ','      1ffff    ','      7fffc    ','     3fffe     ','    1ffff      '],'F':['3fffffffffffff8','3fffffffffffff8','3fffffffffffff8','3fffffffffffff8','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3ffffffffc     ','3ffffffffc     ','3ffffffffc     ','3ffffffffc     ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          ','3fff8          '],'T':['7fffffffffffffe','7fffffffffffffe','7fffffffffffffe','7fffffffffffffe','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     ','     3fffc     '],'W':['fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe       7fff','fffe  3fc  7fff','fffe  fff  7fff','7fff 3fffc fffe','3fff8fffff1fffc','1fffffffffffff8',' fffffffffffff ',' 7fffff fffffe ',' 3ffffc 3ffffc ',' 1ffff   ffff8 ','  fffc   3fff  ','  7ff8   1ffe  ']};function startGame(initial,startOver){if(autoMoveTimer)clearTimeout(autoMoveTimer);if(invadersTimer)clearTimeout(invadersTimer);if(shipTimer)clearTimeout(shipTimer);if(motherShipTimer)clearTimeout(motherShipTimer);if(!startOver){lives=initialLives;wave=1;score=0;invDelay=invDelayMax;nextBonusScore=bonusLifeScore;}
else{invDelay=Math.max(invDelayMin,invDelayMax-10*wave);}
drawGrid(initial);setupSprites(initial);step=1;shipDx=0;firstBomb=0;bombsAvailable=1;bombProbability=0.01;shoot=false;invTop=invBaseLine;invBottom=invBottomLine;invadersDx=invSpeed;invadersDy=invMoveDown=0;invMoveDownCnt=25;motherShip.cnt=1000+Math.floor(Math.random()*400);if(initial){atmDtctY2=shipBaseLine+13;atmDtctDx=ship.bb[2]/2+bombs[0].bb[2]/2-bombs[0].bb[0]/2+1;setAutomaton(0.5);enableKeyboard();}
gameOn=true;autoMoveTimer=setTimeout(startAutoMove,(initial||(!autoMove&&startOver))?2000:4000);autoMove=false;displayScore();moveInvaders();moveShip();moveMotherShip();}
function drawGrid(initial){var r,c,l,k,s,g,v,x,y,div,display=document.getElementById('gamedisplay');for(r=0,l=gridCode.length;r<l;r++){s=gridCode[r];y=r*8+gridCodeTop;g=grid[r]=new Array();for(c=0,k=s.length;c<k;c++){v=parseInt(s.charAt(c),16)||0;if(v){x=c*8+gridCodeLeft;if(initial){div=document.createElement('div');gridElements[r+'_'+c]=div;div.className='tile';display.appendChild(div);div.style.left=x+'px';div.style.top=y+'px';}
else{div=gridElements[r+'_'+c];}
div.style.backgroundPosition='-'+(v*8)+'px 0';g[c]=v;}}}
if(initial){div=document.createElement('div');div.className='baseLine';div.style.width=displayRight+'px';div.style.top=displayBottom+'px';display.appendChild(div);scoreDisplay=document.createElement('div');scoreDisplay.className='score';scoreDisplay.style.width=scoreDisplayWidth+'px';scoreDisplay.style.left=displayRight-scoreDisplayWidth+'px';scoreDisplay.style.top=scoreDisplayTop+'px';display.appendChild(scoreDisplay);}}
function maskGridBy(r,c,v){v=grid[r][c]&=v;gridElements[r+'_'+c].style.backgroundPosition='-'+(v*8)+'px 0';}
function setupSprites(initial){var div,i,r,c,inv,left,type,display=document.getElementById('gamedisplay');if(initial){div=document.createElement('div');div.className='sprite ship';display.appendChild(div);setShipHandler(div);}
else{div=ship.div;}
div.style.backgroundPosition='-130px -9px';div.style.display='block';ship={x:Math.floor(displayRight/2)-13,y:shipBaseLine,div:div,status:1,centerOffset:16,bb:[3,0,29,19],cnt:0,escaped:false};div.style.left=ship.x+'px';div.style.top=ship.y+'px';if(initial){div=document.createElement('div');div.className='sprite motherShip';display.appendChild(div);}
else{div=motherShip.div;}
div.style.display='none';motherShip={x:0,y:0,div:div,status:0,centerOffset:24,bb:[0,0,48,24],bb2:[8,0,40,24],cnt:0};for(i=0;i<24;i++){r=Math.floor(i/8);c=i%8;if(initial){div=document.createElement('div');div.className='sprite invader';display.appendChild(div);}
else{div=invaders[i].div;}
type=(i<16)?1:2;left=(type==1)?0:-26;div.style.backgroundPosition=left+'px -9px';div.style.display='block';inv=invaders[i]={x:c*32,y:r*32+invBaseLine,div:div,status:1,centerOffset:13,type:type,bb:(type==1)?[5,0,21,16]:[2,0,24,16],left:left,isBottom:(r==2),droppedCnt:0,r:r,c:c}
div.style.left=(inv.x)+'px';div.style.top=inv.y+'px';}
invadersLeft=24;if(initial){div=document.createElement('div');div.className='sprite shot';display.appendChild(div);}
else{div=shot.div;}
div.style.display='none';div.style.backgroundPosition='-64px -37px';shot={x:0,y:0,div:div,status:0,centerOffset:1,bb:[0,0,2,8]}
for(i=0;i<bombsMax;i++){if(initial){div=document.createElement('div');div.className='sprite bomb';display.appendChild(div);}
else{div=bombs[i].div;}
div.style.display='none';div.style.backgroundPosition='-64px -37px';bombs[i]={x:0,y:0,div:div,status:0,centerOffset:6,bb:[3,0,9,12],hit:null}}
for(i=0;i<=livesMax;i++){if(initial){div=document.createElement('div');div.className='sprite ship';display.appendChild(div);div.style.backgroundPosition='-130px -9px';div.style.top=displayBottom+4+'px';div.style.left=i*32+'px';livesIcons[i]=div;}
else{div=livesIcons[i];}
div.style.display=(i<lives)?'block':'none';}
if(initial){gameMessage=document.createElement('div');gameMessage.className='gameMessage';display.appendChild(gameMessage);}
gameMessage.style.display='none';leftInvader=invaders[16];rightInvader=invaders[23];invBottomLine=invaders[23].y+invaders[23].bb[3];}
function moveInvaders(){if(!gameOn)return;var inv,i,a,gridHit,dx=invadersDx,reverse=false,enterTime=new Date().getTime();moveBombs();step=(step+1)%4;if(step%2==0){if(invadersDx>0){if(rightInvader.x+rightInvader.bb[2]+invadersDx>=displayRight){invadersDx=-invSpeed;dx=displayRight-rightInvader.bb[2]-rightInvader.x;reverse=true;}}
else{if(leftInvader.x+invadersDx<=-leftInvader.bb[0]){invadersDx=invSpeed;dx=-leftInvader.bb[0]-leftInvader.x;reverse=true;}}
a=(step<2);for(i=0;i<24;i++){inv=invaders[i];if(inv.status>0){inv.div.style.backgroundPosition=inv.left+'px '+((a)?'-30px':'-9px');if(invadersDy){inv.y+=invadersDy;inv.div.style.top=inv.y+'px';}
else{inv.x+=dx;inv.div.style.left=inv.x+'px';}
if(inv.droppedCnt){inv.droppedCnt--;}
else if(inv.isBottom&&Math.random()<bombProbability&&dropBomb(inv.x+inv.centerOffset,inv.y+inv.bb[3])){inv.droppedCnt=(invadersLeft==1)?1:bombDropDelayCnt;}}
else if(inv.status<0){inv.status++;if(inv.status==0)inv.div.style.display='none';}}
if(invadersDy){invadersDy=0;}
else if(reverse){if(invDelay>invDelayMin)invDelay=Math.max(invDelayMin,Math.floor(invDelay*.9));if(bombsAvailable<bombsMax){bombsAvailable++;bombProbability+=0.005;}
if(invMoveDown){invMoveDown-=8;invTop+=8;invBottom+=8;}
if(invMoveDownCnt){if(!--invMoveDownCnt)invMoveDown+=24;}
invadersDy=(invMoveDown>0)?8:0;}}
invadersTimer=setTimeout(moveInvaders,Math.max(1,invDelay+enterTime-new Date().getTime()));}
function moveShip(){if(!gameOn)return;var nx,detect,nb,b,d,dx,sc,i,n,st,bcnt,enterTime=new Date().getTime();moveShot();if((ship.status==1||ship.status==-2)&&shipDx){nx=ship.x+shipDx;if(shipDx<0&&nx<-ship.bb[0]){nx=-ship.bb[0];shipDx=0;}
else if(shipDx>0&&nx+ship.bb[2]>displayRight){nx=displayRight-ship.bb[2];shipDx=0;}
ship.x=nx;ship.div.style.left=nx+'px';}
if(ship.status==1){if(shoot){initShot(ship.x+ship.centerOffset);}
if(autoMove){detect=(Math.random()<atmDtctProbability);if(detect){nb=new Array();d=atmDtctDx-Math.floor(Math.random()*atmDtctFuzzyRange);sc=ship.x+ship.centerOffset;for(i=0;i<bombsAvailable;i++){b=bombs[i];if(b.status==1&&b.y>atmDtctY1&&b.y<atmDtctY2){dx=b.x+b.centerOffset-sc;if(Math.abs(dx)<d)nb.push([b.y,dx]);}}}
if(detect&&nb.length){nb.sort(function(a,b){return b[0]-a[0];});dx=nb[0][1];if(Math.abs(dx)<2&&shot.status==0){initShot(ship.x+ship.centerOffset);}
else{shipDx=(dx>0)?-shipSpeed:shipSpeed;ship.escaped=true;}}
else if(ship.escaped&&(detect||Math.random()<atmDtctRcvrProbability)){ship.escaped=false;if(Math.random()<.75)shipDx=0;}
else if(Math.random()<0.025){if(shipDx){shipDx=(Math.random()<0.75)?0:(Math.random()<0.5)?-shipSpeed:shipSpeed;}
else{if(ship.x>leftInvader.x&&ship.x<rightInvader.x){shipDx=(Math.random()<0.5)?-shipSpeed:shipSpeed;}
else{shipDx=(ship.x<leftInvader.x)?shipSpeed:-shipSpeed;}}}
else if(Math.random()<0.1&&((ship.x>leftInvader.x||invadersDx<0)&&(ship.x<rightInvader.x||invadersDx>0))){initShot(ship.x+ship.centerOffset);}}}
else if(ship.status==-1){ship.cnt++;switch(ship.cnt){case 5:ship.div.style.backgroundPosition='-162px -30px';break;case 10:ship.div.style.backgroundPosition='-130px -30px';break;case 15:ship.div.style.backgroundPosition='-162px -30px';break;case 20:ship.div.style.display='none';break;case 35:if(lives>0){lives--;livesIcons[lives].style.display='none';ship.x=0;ship.y=displayBottom-ship.bb[3]+ship.bb[1]-1;st=ship.div.style;st.backgroundPosition='-130px -9px';st.left='0';st.top=ship.y+'px';st.display='block';ship.cnt=0;shipDx=0;if(!autoMove)resetAutoMoveTimer();ship.status=-2;}
else{ship.status=99;}
break;}}
else if(ship.status==-2){ship.cnt++;if(ship.cnt>30)ship.status=-3;}
else if(ship.status==-3){ship.y-=2;ship.div.style.top=ship.y+'px';if(ship.y<=shipBaseLine){ship.y=shipBaseLine;ship.status=1;ship.escaped=false;if(autoMove){shipDx=1;}
else{shipDx=0;resetAutoMoveTimer();}
shoot=false;}}
else if(ship.status==2){ship.cnt++;if(ship.cnt==5){ship.cnt=1;}
ship.status=3;ship.cnt=1;}
else if(ship.status==3){if(ship.cnt<5)ship.cnt*=1.075;ship.y-=Math.floor(ship.cnt);if(ship.y>=0){ship.div.style.top=ship.y+'px';}
else{gameOn=false;wave++;addScore(100);ship.div.style.display='none';restart('<big>Wave '+wave+'<br />Get ready ...</big><br /><em>Bonus 100</em><br />Next extra life at '+nextBonusScore+'.',true);return;}}
else if(ship.status==99){bcnt=0;for(i=0;i<bombsAvailable;i++){if(bombs[i].status!=0)bcnt++;}
if(!bcnt){if(invadersLeft){gameOn=false;restart('<big>Game Over</big>',false);return;}
else{ship.status=2;ship.cnt=0;}}}
shipTimer=setTimeout(moveShip,Math.max(1,shipDelay+enterTime-new Date().getTime()));}
function moveMotherShip(){if(!gameOn)return;var st,enterTime=new Date().getTime();if(ship.status==1&&motherShip.status==0&&motherShip.cnt>0){motherShip.cnt--;if(motherShip.cnt==0){motherShipDx=(invadersDx>0)?motherShipSpeed:-motherShipSpeed;motherShip.x=(motherShipDx>0)?-motherShip.bb[2]:displayRight;st=motherShip.div.style;st.display='block';st.left=motherShip.x+'px';st.top=motherShip.y+'px';st.backgroundPosition='-196px -29px';motherShip.status=1;}}
if(motherShip.status==1){motherShip.x+=motherShipDx;if((motherShipDx>0&&motherShip.x>displayRight)||(motherShipDx<0&&motherShip.x<-motherShip.bb[2])){motherShip.status=0;motherShip.div.style.display='none';motherShip.cnt=600+Math.floor(Math.random()*300);}
else{motherShip.div.style.left=motherShip.x+'px';}}
else if(motherShip.status<0){motherShip.status++;if(motherShip.status==0){motherShip.div.style.display='none';motherShip.cnt=500+Math.floor(Math.random()*400);}}
motherShipTimer=setTimeout(moveMotherShip,Math.max(1,motherShipDelay+enterTime-new Date().getTime()));}
function shipHit(){ship.div.style.backgroundPosition='-130px -30px';ship.status=-1;ship.cnt=0;if(autoMoveTimer)clearTimeout(autoMoveTimer);}
function initShot(x){var st;if(shot.status==0){shot.status=1;shot.x=x-shot.centerOffset;shot.y=shipBaseLine-shot.bb[3];st=shot.div.style;st.left=shot.x+'px';st.top=shot.y+'px';st.display='block';}
shoot=false;}
function moveShot(){if(shot.status>0){shot.y-=shotSpeed;if(shot.y<0){shot.status=0;shot.div.style.display='none';}
else{shot.div.style.top=shot.y+'px';if(checkGridHit(shot,false)){shot.status=0;shot.div.style.display='none';}
else{if(!shotCheckBombHit()){if(shotCheckInvaderHit()){if(invadersLeft==0){ship.status=99;}}
else if(motherShip.status==1&&shot.y<motherShip.y+motherShip.bb[3]&&shot.x<=motherShip.x+motherShip.bb[2]&&shot.x+shot.bb[2]>=motherShip.x){addScore(100);motherShip.status=-20;motherShip.div.style.backgroundPosition='-196px -8px';if(motherShip.x>displayRight-motherShip.bb2[2]){motherShip.x=displayRight-motherShip.bb2[2];motherShip.div.style.left=motherShip.x+'px';}
else if(motherShip.x<-motherShip.bb2[0]){motherShip.x=-motherShip.bb2[0];motherShip.div.style.left=motherShip.x+'px';}}}}}}}
function dropBomb(x,y){var i,b,st;if(ship.status==99)return;for(i=firstBomb;i<bombsAvailable;i++){b=bombs[i];if(b.status==0){b.status=1;b.x=x-b.centerOffset;b.y=y+2;st=b.div.style;st.left=b.x+'px';st.top=b.y+'px';st.backgroundPosition='-85px -14px';st.display='block';firstBomb=i+1;return true;}}
return false;}
function moveBombs(){var b,i,k,bl,bh,br,sb,sr,sl,stp,gridHit,blast;bh=bombs[0].bb[3];br=bombs[0].bb[2];bl=bombs[0].bb[0];sr=ship.x+ship.bb[2];sl=ship.x+ship.bb[0];stp=ship.y+ship.bb[1];sb=ship.y+ship.bb[3];for(i=0;i<bombsAvailable;i++){b=bombs[i];if(b.status){if(b.status>0){b.y+=bombSpeed;if(b.y>=displayBottom-bh){b.y=displayBottom-bh-1;b.status=-4;b.div.style.backgroundPosition='-85px -35px';}
else if(ship.status==1&&b.y<sb&&b.x+bl<sr&&b.y+bh>stp&&b.x+br>sl){b.status=-1;shipHit();}
else{gridHit=checkGridHit(b,true);if(gridHit){if(!gridHit.blast){b.div.style.backgroundPosition='-111px -35px';b.x=gridHit.x-b.centerOffset;b.div.style.left=b.x+'px';b.y=gridHit.y+8-b.bb[3];}
b.status=-3;b.hit=gridHit;}}
b.div.style.top=b.y+'px';}
else if(b.status<0){b.status++;if(b.status==-2&&b.hit&&b.hit.blast){for(k=0;k<b.hit.blast.length;k++){blast=b.hit.blast[k];if(!blast[3])break;maskGridBy(blast[0],blast[1],blast[2]);}
b.div.style.backgroundPosition='-111px -35px';b.x=b.hit.x-b.centerOffset;b.y=b.hit.y+8-b.bb[3]+2;b.div.style.left=b.x+'px';b.div.style.top=b.y+'px';}
else if(b.status==-1&&b.hit){if(b.hit.blast){for(k=b.hit.blast.length-1;k>=0;k--){blast=b.hit.blast[k];if(!blast[3])maskGridBy(blast[0],blast[1],blast[2]);}}
b.div.style.backgroundPosition='-172px -14px';b.hit=null;}
else if(b.status==0){b.div.style.display='none';if(i<firstBomb)firstBomb=i;}}}}
shotCheckBombHit();}
function shotCheckBombHit(){if(shot.status==1){var sl=shot.x,sr=sl+shot.bb[2],st=shot.y,sb=st+shot.bb[3],i,w=bombs[0].bb[2],h=bombs[0].bb[1],b,bl=bombs[0].bb[0];for(i=0;i<bombsAvailable;i++){b=bombs[i];if(b.status==1&&sr>=b.x+bl&&sb>b.y&&sl<b.x+w&&st<b.y+h){b.div.style.backgroundPosition='-111px -14px';b.status=-4;shot.status=0;shot.div.style.display='none';addScore(5);return true;}}}
return false;}
function shotCheckInvaderHit(){if(shot.status==1&&invadersLeft){var st=shot.y,sb=st+shot.bb[3],sl,r,c,inv,t,k,rt,r0;if(st<invBottom&&sb>=invTop){sl=shot.x;c=Math.floor((sl-leftInvader.x)/32)+leftInvader.c;if(c>=0&&c<8){r=Math.floor((sb-invTop)/32);inv=invaders[r*8+c];if(inv.status==1&&sb>inv.y&&st<=inv.y+inv.bb[3]&&sl<=inv.x+inv.bb[2]&&sl+shot.bb[2]>=inv.x+inv.bb[0]){shot.status=0;shot.div.style.display='none';inv.status=-2;inv.div.style.backgroundPosition='-52px -9px';addScore((inv.type==2)?30:20);invadersLeft--;switch(invadersLeft){case 0:return true;case 2:bombProbability+=0.0005;break;case 1:bombProbability+=0.005;break;}
if(inv.isBottom){t=true;rt=0;r0=r;for(r=0;r<3&&t;r++){for(k=0;k<8&&t;k++){if(invaders[r*8+k].status==1){if(r<=r0)rt=r;if(k==c&&r<r0){invaders[r*8+k].isBottom=true;if(r>0)invaders[(r-1)*8+k].isBottom=false;}
if(r>=r0)t=false;}}
if(!t)break;}
if(t)invMoveDown+=(r0-rt)*32;bombProbability+=0.00025;}
if(inv==rightInvader||inv==leftInvader){t=-1000;for(r=2;r>=0;r--){for(c=7;c>=0;c--){inv=invaders[r*8+c];if(inv.status==1&&c*32+inv.bb[2]>t){rightInvader=inv;t=c*32+inv.bb[2];break;}}}
t=10000;for(r=2;r>=0;r--){for(c=0;c<8;c++){inv=invaders[r*8+c];if(inv.status==1&&c*32+inv.bb[0]<t){leftInvader=inv;t=c*32+inv.bb[0];break;}}}}
return true;}}}}
return false;}
function checkGridHit(obj,isBomb){var x1=obj.x,x2=obj.x+obj.bb[2],y=(isBomb)?obj.y+obj.bb[3]:obj.y,x,r,c,bit,mask,mask2,v,hitY,rmax,cmax,cnt,blast=new Array();if(y>gridCodeTop&&y<gridCodeBottom&&x2>gridCodeLeft&&x1<=gridCodeRight){x=obj.x+obj.centerOffset-gridCodeLeft;c=Math.floor(x/8);r=Math.floor((y-gridCodeTop)/8);v=grid[r][c];bit=3-Math.floor((x%8)/2);mask=1<<bit;if(v){if(isBomb){if(bit<3)mask|=1<<(bit+1);if(bit>0)mask|=1<<(bit-1);}
if(v&mask){hitY=gridCodeTop+r*8;maskGridBy(r,c,255^mask);if(!isBomb){cnt=2;while(cnt--&&r>0){r--;if(grid[r][c])maskGridBy(r,c,255^mask);}}}}
if(isBomb){rmax=grid.length-1;cmax=gridCols-1;if(bit==3&&c>0){v=grid[r][c-1];if(v&1){hitY=gridCodeTop+r*8;maskGridBy(r,c-1,254);}}
if(bit==0&&c<cmax){v=grid[r][c+1];if(v&8){hitY=gridCodeTop+r*8;maskGridBy(r,c+1,247);}}
if(hitY&&r<rmax){mask2=mask;if(bit<2)mask2|=1<<(bit+2);if(bit>1)mask2|=1<<(bit-2);r++;if(grid[r][c]&mask2){hitY=gridCodeTop+r*8;blast.push([r,c,255^mask2,true]);}
else{mask=0;}
if(bit>1&&c>0&&grid[r][c-1]){blast.push([r,c-1,(bit==2)?254:252,false]);}
if(bit<2&&c<cmax&&grid[r][c+1]){blast.push([r,c+1,(bit==0)?243:247,false]);}
if(mask&&r<rmax){r++;if(grid[r][c]&mask){blast.push([r,c,255^mask,false]);}
if(bit==3&&c>0&&grid[r][c-1]){blast.push([r,c-1,254,false]);}
if(bit==0&&c<cmax&&grid[r][c+1]){blast.push([r,c+1,247,false]);}}}}}
return(hitY)?{x:1+Math.floor(x/2)*2+gridCodeLeft,y:hitY,blast:(blast.length)?blast:null}:null;}
function addScore(v){score+=v;displayScore();if(score>=nextBonusScore){if(lives+1<=livesMax){livesIcons[lives].style.display='block';lives++;}
nextBonusScore=score-score%bonusLifeScore+bonusLifeScore;}}
function displayScore(){scoreDisplay.innerHTML='Score: '+score;}
function restart(message,startOver){gameMessage.style.opacity=0.1;gameMessage.innerHTML=message;gameMessage.style.display='block';gameMessage.style.left=Math.floor((displayRight-gameMessage.offsetWidth)/2)+'px';gameMessage.style.top=Math.floor((displayBottom-gameMessage.offsetHeight)/2)-32+'px';ship.cnt=0.1;if(shipTimer)clearTimeout(shipTimer);shipTimer=setTimeout(function(){restartMessageFadeIn(startOver);},35);}
function restartMessageFadeIn(startOver){if(shipTimer)clearTimeout(shipTimer);if(gameMessage){ship.cnt+=0.1;if(ship.cnt<0.8){gameMessage.style.opacity=ship.cnt;shipTimer=setTimeout(function(){restartMessageFadeIn(startOver);},35);return;}
else{gameMessage.style.opacity=0.8;ship.cnt=0.8;}}
shipTimer=setTimeout(function(){restartMessageFadeOut(startOver);},5000);}
function restartMessageFadeOut(startOver){if(shipTimer)clearTimeout(shipTimer);if(gameMessage){ship.cnt-=0.08;if(ship.cnt>=0){gameMessage.style.opacity=ship.cnt;shipTimer=setTimeout(function(){restartMessageFadeOut(startOver);},35);return;}
else{gameMessage.style.display='none';gameMessage.style.opacity=1;ship.cnt=0;}}
shipTimer=setTimeout(function(){startGame(false,startOver);},10);}
function resetAutoMoveTimer(){if(autoMoveTimer)clearTimeout(autoMoveTimer);autoMoveTimer=setTimeout(startAutoMove,autoMoveDelay);autoMove=false;}
function startAutoMove(){if(autoMoveTimer)clearTimeout(autoMoveTimer);autoMoveTimer=null;autoMove=true;ship.escaped=false;}
function enableKeyboard(){if(document.addEventListener){document.addEventListener("keypress",keyHandler,true);document.addEventListener("keydown",keyUpDown,true);document.addEventListener("keyup",keyUpDown,true);}
else if(document.attachEvent){if(document.captureEvents&&window.Event&&window.Event.KEYPRESS)document.captureEvents(Event.KEYPRESS);document.attachEvent('onkeypress',keyHandler);document.attachEvent('onkeydown',keyUpDown);document.addEventListener("keyup",keyUpDown,true);}}
function keyUpDown(e){if(!e)e=window.event;var up=(e.type.toLowerCase()=='keyup');var handler=(up)?keyUpHandler:keyHandler;if(e){if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)return true;var k=e.keyCode;if(k==8)handler({which:8,fwd:true})
else if(k==37)handler({which:28,fwd:true})
else if(k==39)handler({which:29,fwd:true})
else if(k==27)handler({which:27,fwd:true})
else if(k>=57373&&k<=57376){if(k==57375)handler({which:28,fwd:true})
else if(k==57376)handler({which:29,fwd:true});}
else{if(up){if(handler(e))return true;}
else{e.cancelBubble=false;return true;}}
if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.cancelBubble=true;e.returnValue=false;return false;}
return true;}
function keyUpHandler(e){if(e.fwd){if(e.which==lastMoveKey){lastMoveKey=0;if(gameOn&&shipDx&&(ship.status==1||ship.status==-2)){shipDx=0;resetAutoMoveTimer();}}}
else{if(!e)e=window.event;var k=e.which||e.keyCode;if(k==''){if(e.charCode==0&&e.keyCode){if(e.keyCode==37)k=28
else if(e.keyCode==39)k=29
else if(e.keyCode==27)k=27;}}
if(k==lastMoveKey||(k>=32&&k<127&&String.fromCharCode(k).toLowerCase()==lastMoveKey)){lastMoveKey=0;if(gameOn&&shipDx&&(ship.status==1||ship.status==-2)){shipDx=0;resetAutoMoveTimer();}}}}
function keyHandler(e){var k,ch,ctrl=false;if((ship.status!=1&&ship.status!=-2)||!gameOn)return true;if(e){k=e.which||e.keyCode;ctrl=(e.ctrlKey||e.metaKey||e.altKey||e.metaKey||e.modifiers||e.shiftKey);}
else if(window.event){k=window.event.keyCode;ctrl=(window.event.ctrlKey||window.event.altKey||window.event.metaKey||window.event.shiftKey);}
else return true;if(ctrl)return true;if(k==''){if(e==null)e=window.event;if(e.charCode==0&&e.keyCode){if(e.keyCode==37)k=28
else if(e.keyCode==39)k=29
else if(e.keyCode==27)k=27;}}
ch=(k>=32&&k<127)?String.fromCharCode(k):'';ch=ch.toLowerCase();var rval=true;if(ch=="4"||ch=="a"||k==28){shipDx=-shipSpeed;resetAutoMoveTimer();lastMoveKey=ch||k;rval=false;}
else if(ch=="6"||ch=="d"||ch=="s"||k==29){shipDx=shipSpeed;resetAutoMoveTimer();lastMoveKey=ch||k;rval=false;}
else if(ch=="0"||ch==" "||k==13||k==32||ch=="x"||ch=="y"||ch=="z"){shoot=true;resetAutoMoveTimer();rval=false;}
else if(ch=="5"){shipDx=0;resetAutoMoveTimer();rval=false;}
else if(ch=='n'){gomeOn=false;startGame(false,false);rval=false;}
if(rval)return true;if(!e)e=window.event;if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();e.cancelBubble=true;e.returnValue=false;return false;}
var automatonDefMin={dr:84,dp:0,rp:0,fr:7}
var automatonDefMax={dr:96,dp:1,rp:1,fr:1}
function setAutomaton(v){if(v){v=Number(v);if(isNaN(v)||v>1){v=1;}
else if(v<0){v=0;}}
else{v=0;}
atmDtctProbability=automatonDefMin.dp+(automatonDefMax.dp-automatonDefMin.dp)*v;atmDtctRange=automatonDefMin.dr+Math.round((automatonDefMax.dr-automatonDefMin.dr)*v);atmDtctRcvrProbability=automatonDefMin.rp+(automatonDefMax.rp-automatonDefMin.rp)*v;atmDtctFuzzyRange=automatonDefMax.fr+Math.round(Math.abs(automatonDefMax.fr-automatonDefMin.fr)*(1-v));atmDtctY1=shipBaseLine-atmDtctRange;automatonSetting=v;}
function setShipHandler(obj){if(document.addEventListener){obj.addEventListener('click',shipHandler,false);if(isTouch){obj.addEventListener(evntTouchStart,shipHandler,false);if(isMSTouch)registerMSTouchZone(obj);}}
else if(document.attachEvent){obj.attachEvent('onclick',shipHandler);}}
function shipHandler(e){if(gameOn){var v,s=String(automatonSetting);if(s.indexOf('.')<0)s+='.0';v=window.prompt('Automaton\'s Awareness (0 .. 1; 1: best):',s);if(v){v=parseFloat(v.replace(',','.'));if(!isNaN(v))setAutomaton(v);}}
cancelTouchEvent(e||window.event);}
function resolveTouchAPI(){isTouch=Boolean(window.Touch||(document.documentElement&&document.documentElement.ontouchstart)||window.ontouchstart||isTouchDeviceByEvent());if(window.navigator.msPointerEnabled){if(navigator.msMaxTouchPoints){isTouch=true;isMSTouch=true;evntTouchStart='MSPointerDown';evntTouchEnd='MSPointerUp';evntTouchMove='MSPointerMove';evntTouchCancel='MSPointerCancel';}
else{isTouch=false;}}
else{isMSTouch=false;if(isTouch){evntTouchStart='touchstart';evntTouchEnd='touchend';evntTouchMove='touchmove';evntTouchCancel='touchcancel';}}}
function isTouchDeviceByEvent(){var el=document.createElement('div');el.setAttribute('ongesturestart','return;');return(typeof el.ongesturestart=="function");}
function getIsTouch(){return isTouch;}
function getTouchEvents(){return{'start':evntTouchStart,'end':evntTouchEnd,'move':evntTouchMove,'cancel':evntTouchCancel};}
function registerMSTouchZone(el){var st=el.style;if(typeof st.msContentZooming!='undefined')st.msContentZooming='none';if(typeof st.msTouchAction!='undefined')st.msTouchAction='none';}
function cancelTouchEvent(e){if(!e)e=window.event;if(e.preventDefault)e.preventDefault();if(e.stopPropagation)e.stopPropagation();if(event.preventManipulation)event.preventManipulation();if(event.preventMouseEvent)event.preventMouseEvent();e.cancelBubble=true;e.returnValue=false;}
function disableTouchSelect(){var b=document.getElementsByTagName('body')[0];b.style.webkitUserSelect='none';b.style.mozUserSelect='none';b.style.msUserSelect='none';b.style.userSelect='none';}
function buttonTouchHandlerFactory(code){return function(event){buttonTouchHandler(event,code);}}
var buttonTouches={};function buttonTouchHandler(event,code){cancelTouchEvent(event);var id,touchIds=new Array();if(isMSTouch){id=event.pointerId;if(!buttonTouches[id])touchIds.push(id);}
else{for(var i=0;i<event.changedTouches.length;i++){id=event.changedTouches[i].identifier;if(!buttonTouches[id])touchIds.push(id);}}
if(touchIds.length){keyHandler({which:code,fwd:true});}
for(var i=0;i<touchIds.length;i++){buttonTouches[touchIds[i]]={code:code};}}
function buttonTouchEndHandler(event){var id,touchIds=new Array();if(isMSTouch){id=event.pointerId;if(buttonTouches[id])touchIds.push(id);}
else{for(var i=0;i<event.changedTouches.length;i++){id=event.changedTouches[i].identifier;if(buttonTouches[id])touchIds.push(id);}}
for(var i=0;i<touchIds.length;i++){var td=buttonTouches[touchIds[i]];var k=td.code;if(k==lastMoveKey||(k>=32&&k<127&&String.fromCharCode(k).toLowerCase()==lastMoveKey)){lastMoveKey=0;if(gameOn&&shipDx&&(ship.status==1||ship.status==-2)){shipDx=0;resetAutoMoveTimer();}}
cancelTouchEvent(event);delete buttonTouches[touchIds[i]];}}
function setUpTouchButtons(){var buttonData=[28,29,32],pe=document.createElement('div');pe.id='touchButtons';for(var i=0;i<3;i++){var el=document.createElement('div');el.className='arcadeButton';if(i==1)el.className+=' arcadeButtonSpaceAfter';el.addEventListener(evntTouchStart,new buttonTouchHandlerFactory(buttonData[i]),false);if(isMSTouch)registerMSTouchZone(el);pe.appendChild(el);}
var display=document.getElementById('gamedisplay');display.parentNode.insertBefore(pe,display.nextSibling);document.addEventListener(evntTouchEnd,buttonTouchEndHandler,false);document.addEventListener(evntTouchCancel,buttonTouchEndHandler,false);pe.addEventListener(evntTouchStart,cancelTouchEvent,false);if(isMSTouch)registerMSTouchZone(pe);disableTouchSelect();}
function init(statusCode){if(document.createElement&&setGridCode(statusCode)){if(isTouch)setUpTouchButtons();startGame(true,false);}}
resolveTouchAPI();this.init=init;this.isTouch=getIsTouch;this.getTouchEvents=getTouchEvents;}
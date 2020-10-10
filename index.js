const MAP = ['石头', '剪刀', '布'];
const playerActionIndex = process.argv[process.argv.length - 1];
const playerAction = MAP[playerActionIndex];
const computerActionIndex = Math.floor(Math.random() * 3);
const computerAction = MAP[computerActionIndex];
let desc = '';
if (isNaN(playerActionIndex)) {
  console.log('请出拳！');
} else {
  if (playerActionIndex - computerActionIndex === -1) {
    desc = '恭喜你，你赢了！';
  } else if (playerActionIndex - computerActionIndex === 0) {
    desc = '这局是平局!';
  } else {
    desc = '抱歉，你输了！'
  }
  console.log(`你出了${playerAction}，对方出了${computerAction}，${desc}`);
}

const MAP = ['石头', '剪刀', '布'];
module.exports =  function (playerActionIndex) {
  const playerAction = MAP[playerActionIndex];
  const computerActionIndex = Math.floor(Math.random() * 3);
  const computerAction = MAP[computerActionIndex];
  let desc = '';
  let status = 0;
  if (playerActionIndex - computerActionIndex === -1) {
    desc = '恭喜你，你赢了！';
    status = 1;
  } else if (playerActionIndex - computerActionIndex === 0) {
    desc = '这局是平局!';
    status = 0;
  } else {
    desc = '抱歉，你输了！';
    status = -1;
  }
  return {
    desc: `你出了${playerAction}，对方出了${computerAction}，${desc}`,
    status,
  };
}

const request = require('request');
const url = 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_global_vars'
var config = require('./config');
var slack = require('./config/slack')(config);

var oldData = {
	confirmCount: 0,
  suspectCount: 0,
  deadCount: 0,
}

function getCount() {
  return new Promise(resolve => {
    request({
      method: 'GET',
      url: url,
    }, (err, res, body) => {
      if (err) return console.error(err);
      resolve(JSON.parse(JSON.parse(body).data)[0])
    });
  });
}

async function main(){
		let data = await getCount()
		if(oldData.confirmCount < data.confirmCount){
			slack.sendMessage(`Thêm ${data.confirmCount - oldData.confirmCount} (${data.confirmCount}) người xác nhận nhiễm mới`, 'D8GQ87MN0')
		}

		if(oldData.suspectCount < data.suspectCount){
			slack.sendMessage(`Thêm ${data.suspectCount - oldData.suspectCount} (${data.suspectCount}) người tình nghi nhiễm mới`, 'D8GQ87MN0')

		}

		if(oldData.deadCount < data.deadCount){
			slack.sendMessage(`Thêm ${data.deadCount - oldData.deadCount} (${data.deadCount}) người chết vì virut`, 'D8GQ87MN0')
		}
		// slack.sendMessage(`thời gian cập nhật ${data.recentTime}`, 'D8GQ87MN0')
		oldData = data
		console.log(data);
}


slack.start()
setInterval(()=>{
	main()
}, 60000)

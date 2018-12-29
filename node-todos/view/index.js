window.onload = function () {
  let todoList = []
  let html = ''

  // 获取dom
  let input = document.getElementsByTagName('input')[0]
  let content = document.getElementById('content')

  const getInfo = () => {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:9000',
      data: '',
      success: function(res){
        console.log(res)
        todoList = res
        // 清空现有todos列表中ul节点下的DOM
        content.innerHTML = ''
        // 使用渲染引擎
        let data = {
          todoList: todoList
        }
        html = template('test', data)
        content.innerHTML = html

        // for (let i = 0; i < todoList.length; i++) {
        //   html += `
        //   <li>
        //     <span>${todoList[i]}</span>
        //   </li>
        //   `
        // }

        // 清空当前todo
        html = ''
        input.value = ''
      }
    })
  }
  
  // 初始化数据
  getInfo()

  input.addEventListener('keyup', function(e){
    if (e.keyCode == 13) {
      todo = input.value

      $.ajax({
        type: 'POST',
        url: 'http://localhost:9000',
        data: todo,
        success: function(res){
          if (res.result == 1) {
            getInfo()
          }
        }
      })
    }
    
  })
}

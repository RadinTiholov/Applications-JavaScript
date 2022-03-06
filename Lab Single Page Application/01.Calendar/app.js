window.onload=function(){
    let body = document.querySelector('body');
    const captions = Array.from(document.querySelectorAll('caption'));
    captions.forEach(caption => {
        caption.addEventListener('click', backButtonPress)
    });
    clearAll();
    body.children[0].style.display = "inline";
    body.addEventListener('click', onClickBlock);
    let year = '';
    const months = ['empty', 'Jan' ,'Feb' ,'Mar' ,'Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    function onClickBlock(e){
        if (e.target.children.length > 0) {
            let content = e.target.children[0].textContent;
            console.log(content);
            displayNewDate(content);
        }
        else{
            let content = e.target.textContent;
            displayNewDate(content);
        }
    }
    function clearAll(){
        body = document.querySelector('body');
        for (let i = 0; i < Array.from(body.children).length; i++) {
            body.children[i].style.display = "none";
        }
    }
    function displayNewDate(content){
        if (content == '2020' || content == '2021'|| content == '2022'|| content == '2023') {
            clearAll();
            const yearElement = document.getElementById(`year-${content}`);
            year = content;
            yearElement.style.display = 'inline';
        }
        else if(content == 'Jan' || content == 'Feb' || content == 'Mar' || content == 'Apr' || content == 'May' || content == 'Jun' || content == 'Jul' || content == 'Aug' || content == 'Sept' || content == 'Oct' || content == 'Nov' || content == 'Dec'){
            clearAll();
            const number = months.indexOf(content);
            const monthElement = document.getElementById(`month-${year}-${number}`);
            monthElement.style.display = 'inline';
        }
    }
    function backButtonPress(e){
        const elements = e.target.textContent.split(' ');
        if (elements.length == 2) {
            console.log(elements[1]);
            displayNewDate(elements[1]);
        }
        else if(elements.length == 1){
            location.reload();
        }
    }
}
// (() =>{

  const menu = document.querySelector('.menu');

  const menuSkirt = document.querySelector('.menu-skirt');
  const submenuSkirt = document.querySelector('.submenu-skirt');
  const submenuItem = document.querySelectorAll('.submenu-item');

  const menuDifficulty = document.querySelector('.menu-difficulty');
  const submenuItemDifficulty = document.querySelectorAll('.submenu-difficulty-item');
  const submenuDifficulty = document.querySelector('.submenu-difficulty');

  const buttonNewGame = document.getElementById('button-new-game');

  const buttonScore = document.getElementById('button-score');
  const scoreTablePage = document.querySelector('.score-popup-table');
  const scorePopup = document.querySelector('.score-popup');
  const scorePopupCloseButton = document.querySelector('.popup__button-close.-score');

  const gameField = document.querySelector('.game-field');
  const playingFieldOverlay = document.querySelector('.playing-field-overlay');

  const inputClock = document.querySelector('.game-timer__clock');

  const formButton = document.querySelector('.form-submit');
  const userForm = document.querySelector('.user-form');

  const congratulationPopup = document.querySelector('.congratulation-popup');
  const congratulationPopupText = document.querySelector('.congratulation-popup-text');
  const congratulationPopupCloseButton = document.querySelector('.popup__button-close.-congratulation');

  const popupsOverlay = document.querySelector('.popups-overlay');

  const loginPage = document.querySelector('.wrap-descr-and-form');

  const bg_card_0 = 'url(assets/img/content/Minions_0.png)';
  const bg_card_1 = 'url(assets/img/content/Minions_1.png)';
  const bg_card_2 = 'url(assets/img/content/Minions_2.png)';

  const img_root = 'url(assets/img/content/cards/';

  const gameArrayLow = [1,1,2,2,3,3,4,4,5,5];
  const gameArrayMedium = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
  const gameArrayHight = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12];


  let gameCard = document.querySelectorAll('.game-card');
  let currentUser = {};

  let defaultBg, lastImg, indexElement, gameArray, difficultyLevel, difficultyName;
  let countClick = 0;
  let flagClick = 1;
  let counter = 0;
  let hiddenImgCount = gameCard.length;

  let clocktimer, startDate, thisDate, tDiff;
  let sumTime = 0;
  let init = 0;

  let scoreTable = localStorage['score'] && JSON.parse(localStorage['score']) || [];



////////function visible popups////////////////////

  function popupVisible(namePopup){
    namePopup.classList.toggle('hide');

    popupsOverlay.classList.toggle('hide');
  };

  buttonScore.addEventListener('click', ()=>{
    popupVisible(scorePopup);

  });

  scorePopupCloseButton.addEventListener('click', ()=>{
    popupVisible(scorePopup);
  });

  congratulationPopupCloseButton.addEventListener('click', ()=>{
    popupVisible(congratulationPopup);
  });



///////////function add text popup congratulation///////////////////

  function congratulationText(counter, gameTime){
    congratulationPopupText.innerHTML = `<div class="congratulation-popup-text__title"><h3>Congratulation!</h3></div>
                                       <div><p>You won. Your score is <span class="congratulation-popup-text__size">${counter}</span> steps, and your time is <span class="congratulation-popup-text__size">${gameTime}</span></p></div>`

  };


////////////////add score to scoreTable/////////////////

  function addScore(data){
    // console.log(data.length);
    if(data.length !== 0){
      // console.log(data)
      let tableRows = data.map((item,index) => `<tr>
                                                <td>${data[index].lname}</td>
                                                <td>${data[index].fname}</td>
                                                <td>${data[index].email}</td>
                                                <td>${data[index].steps}</td>
                                                <td>${data[index].gameTime}</td>
                                              </tr>`).join('\n');

      scoreTablePage.innerHTML = ` <table class="score-table">
                                <tr class="score-table__head">
                                  <th>Last name</th>
                                  <th>First name</th>
                                  <th>E-mail</th>
                                  <th>Count<br>Steps</th>
                                  <th>Time</th>
                                </tr>
                                ${tableRows}
                              </table>`;
    } else {
    scoreTablePage.innerHTML = `<div class="score-text">
                                  <div class="score-text__title"><p>Sorry, but the result table is empty.</p></div>
                                  <div><p>You need to play the game once</p></div>
                               </div>`
    }
  }


  addScore(scoreTable);



  gameArray = gameArrayLow;


  ////////////update results in score table and localStorage////////////

  function updateResults(){
    let oldIndex = 0;
    scoreTable.some((result, index)=>{
      oldIndex = index;
      return result.gameTime > currentUser.gameTime;
    });
    scoreTable.splice(oldIndex, 0, currentUser);
    scoreTable = scoreTable.slice(0, 10);
    addScore(scoreTable)
    localStorage['score'] = JSON.stringify(scoreTable);
  }

  //////////add new user from form///////////////////////

  function addUser(e){
    for (let i =0; i < userForm.length; i++){
      const el = userForm[i];
      if (el.type !== "submit" && el.type !== "button"){
        currentUser[el.name] = el.value;
      }

    }
    loginPage.classList.toggle('hide');
    gameField.classList.toggle('hide');
    menu.classList.toggle('hide');
    overlayView();

    return false;
  }

  //////////////////timer__clock///////////////////////////////

  function clearField(){
    init = 0;
    clearTimeout(clocktimer);
    inputClock.value = '00:00.00';
  }

  function timeToStr (time) {
    let hours, minutes, seconds, mSeconds;
    mSeconds = time % 1000;
    time -= mSeconds;
    mSeconds = Math.floor( mSeconds / 10 );
    time = Math.floor( time / 1000 );
    seconds = time % 60;
    time -= seconds;
    time = Math.floor( time / 60 );
    minutes = time % 60;
    time -= minutes;
    time = Math.floor( time / 60 );
    // hours = time % 60;

    // if ( hours < 10 ) { hours = '0' + hours; }
    if ( minutes < 10 ) { minutes = '0' + minutes; }
    if ( seconds < 10 ) { seconds = '0' + seconds; }
    if ( mSeconds < 10 ) { mSeconds = '0' + mSeconds; }

    return `${minutes}:${seconds}.${mSeconds}`;
  }

  function startTime(){
    let str;
    thisDate = new Date();
    tDiff = thisDate.getTime() - startDate.getTime();
    str = timeToStr(tDiff);
    if (init == 1) {
      inputClock. value = str;
    }
    clockTimer = setTimeout('startTime()', 10);
  }

  function findTime(){
    if ( init == 0){
      startDate = new Date();
      startTime();
      init = 1;
    } else {
      sumTime = tDiff;
      console.log(timeToStr(sumTime));
      clearField();
      return timeToStr(sumTime);
    }
  }

  inputClock.addEventListener('click', ()=> {
    findTime();
  })


  /////////change background cards/////////////////////////////

  defaultBg = bg_card_0;

  function changeDifficulty(array = [], nameInsert, nameDiff){
    difficultyLevel = array.map(item => `<div class="game-card ${nameDiff}"></div>`)
    .join('\n');
    nameInsert.innerHTML = difficultyLevel;
  }

  ////////////sort cards array////////////////////////////////

  function mixCards(mixArray){

    let index, valueIndex;
    for (let i = 0, length = mixArray.length; i < length; i++ ){
      index = Math.floor(Math.random()*i);
      valueIndex = mixArray[index];
      mixArray[index] = mixArray[i];
      mixArray[i] = valueIndex;
    }

    return mixArray;
  }


///////////////add attributs cards////////////////////////////

  function addCardsAttr(gameArr){
      gameCard = document.querySelectorAll('.game-card');
      hiddenImgCount = gameCard.length;
      counter = 0;
    for (let i =0; i< gameCard.length; i++){
      gameCard[i].setAttribute('data-element', i);
      gameCard[i].setAttribute('data-number', `${gameArr[i]}`);
      gameCard[i].setAttribute('data-state', '0');
    }
  }

  mixCards(gameArrayLow);
  addCardsAttr(gameArrayLow);


/////////////////game logic////////////////////////////

  gameField.addEventListener('click', (e) =>{
    gameCard = document.querySelectorAll('.game-card');
    if (e.target.dataset.element){
      counter++;
    }
    indexElement = e.target.dataset.element;

    if (e.target.dataset.state == 0 && flagClick == 1) {
      if (countClick == 0) {

        countClick++;

        lastImg = gameCard[indexElement].dataset.number;
        gameCard[indexElement].classList.toggle('flipped');
        gameCard[indexElement].setAttribute('data-state', '1');

        setTimeout( ()=>{ gameCard[indexElement].style.backgroundImage = `${img_root}${lastImg}.png`;}, 200);
      } else {
        if ( lastImg == e.target.dataset.number){

          for (let i =0; i< gameCard.length; i++){

            if (gameCard[i].dataset.state == 1){
              gameCard[i].setAttribute('data-state', '2');
            }

          }

          gameCard[indexElement].classList.toggle('flipped');
          gameCard[indexElement].setAttribute('data-state', '2');

          setTimeout( ()=>{ gameCard[indexElement].style.backgroundImage = `${img_root}${lastImg}.png`;}, 200);

          hiddenImgCount -= 2;

          function hideVisible(){

            for (let i =0; i< gameCard.length; i++){

              if (gameCard[i].dataset.state == 2){
                gameCard[i].style.opacity = '0';
                setTimeout( ()=>{gameCard[i].style.visibility = 'hidden';}, 500)
              }

            }
          };

          setTimeout(hideVisible, 1000);

        } else {
          lastImg = e.target.dataset.number;

          gameCard[indexElement].classList.toggle('flipped');
          gameCard[indexElement].setAttribute('data-state', '1');

          setTimeout( ()=>{ gameCard[indexElement].style.backgroundImage = `${img_root}${lastImg}.png`;}, 200);

          flagClick = 0;

          function hideImg(){

            for (let i =0; i< gameCard.length; i++){

              if (gameCard[i].dataset.state == 1){
                gameCard[i].setAttribute('data-state', '0');
                gameCard[i].classList.toggle('flipped');

                setTimeout( ()=>{gameCard[i].style.backgroundImage = defaultBg;}, 200);
              }

            }

            flagClick = 1;

          };

          setTimeout(hideImg, 1000);
        }

        countClick = 0;

      }
    }

///////////////////////////
    if (!hiddenImgCount){
      buttonNewGame.innerHTML = 'new game';
      buttonNewGame.setAttribute('data-state', '0');

      menuSkirt.classList.toggle('hide');
      menuDifficulty.classList.toggle('hide');

      overlayView();

      let gameTime = findTime();

      currentUser = Object.assign({},currentUser);
      currentUser.steps = counter;
      currentUser.gameTime = gameTime;

      congratulationText(counter, gameTime);

      setTimeout(()=>{popupVisible(congratulationPopup)}, 1500);
      updateResults();

    }

  });
///////////////////////////////

  function changeActive(temp, name){

    for (let i = 0; i < name.length; i++){
      name[i].classList.remove('active');
    }
    name[temp].classList.add('active');
  };

  function changeBg(backgroundURL){
    for (let i = 0; i < gameCard.length; i++){
      defaultBg = gameCard[i].style.backgroundImage = backgroundURL;
    }
  };

  menuSkirt.addEventListener('click', () =>{
    submenuSkirt.classList.toggle('hide');
  });



  submenuSkirt.addEventListener('click', (e) =>{
    submenuSkirt.classList.toggle('hide');
      let dataSkirt = e.target.dataset.skirt;

      if (dataSkirt == 0){
        changeActive(dataSkirt, submenuItem);

        changeBg(bg_card_0);

      } else if ( dataSkirt == 1){
        changeActive(dataSkirt, submenuItem);

        changeBg(bg_card_1);

      } else if ( dataSkirt == 2){
        changeActive(dataSkirt, submenuItem);

        changeBg(bg_card_2);
      }

  });

  function overlayView(){
    playingFieldOverlay.classList.toggle('hide');
  }

  menuDifficulty.addEventListener('click', () =>{
    submenuDifficulty.classList.toggle('hide');
  });

  submenuDifficulty.addEventListener('click', (e) =>{
    submenuDifficulty.classList.toggle('hide');
    let dataDifficulty = e.target.dataset.difficulty;


    if ( dataDifficulty == 0 ) {
      changeActive(dataDifficulty, submenuItemDifficulty);
      gameArray = gameArrayLow;
      difficultyName = 'low';
      changeDifficulty(gameArray, gameField);
      mixCards(gameArray);
      addCardsAttr(gameArray);
      changeBg(defaultBg);

    } else if ( dataDifficulty == 1 ) {
      changeActive(dataDifficulty, submenuItemDifficulty);
      gameArray = gameArrayMedium;
      difficultyName = 'medium';
      changeDifficulty(gameArray, gameField, difficultyName);
      mixCards(gameArray);
      addCardsAttr(gameArray);
      changeBg(defaultBg);

    }else if ( dataDifficulty == 2 ) {
      changeActive(dataDifficulty, submenuItemDifficulty);
      gameArray = gameArrayHight;
      difficultyName = 'hight';
      changeDifficulty(gameArray, gameField, difficultyName);
      mixCards(gameArray);
      addCardsAttr(gameArray);
      changeBg(defaultBg);
    }
  });

  buttonNewGame.addEventListener('click', (e)=>{
    stateButton(e);
    menuSkirt.classList.toggle('hide');
    menuDifficulty.classList.toggle('hide');
    changeDifficulty(gameArray, gameField, difficultyName);
    overlayView();
    mixCards(gameArray);
    addCardsAttr(gameArray);
    changeBg(defaultBg);
    findTime();
  });

  function stateButton(e){
    if(e.target.dataset.state == 0){
      buttonNewGame.innerHTML = 'stop game';
      buttonNewGame.setAttribute('data-state', '1');
    } else {
      buttonNewGame.innerHTML = 'new game';
      buttonNewGame.setAttribute('data-state', '0');
    }
  }






// })()

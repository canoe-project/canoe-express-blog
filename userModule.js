const fs = require("fs");

//파일의 정보를 저장하기 위한 클래스
class fileData {
  constructor(fileName, stats) {
    this.name = fileName;
    this.stats = stats;
  }
}

/*해당 경로 폴더의 파일들을 확인하기 위한 함수
반환값으로 Promise를 반환하며 promise loop chain을 위해 사용한다.*/
const fileSearch = (target) => {
  return new Promise((resolve, reject) => {
    fs.readdir(`assets/fileData/${target}`, (err, files) => {
      return resolve(files);
    });
  });
};

/*확인하고자 하는 파일의 경로와 이름 그리고 배열 변수를 주면 파일의 정보를 fileData의 객체를 생성하여 
그 값을 resolve한다.*/
const creatList = (target, file, fileList) => {
  return new Promise((resolve, reject) => {
    fs.stat(`assets/fileData/${target}/${file}`, async (err, stats) => {
      await fileList.push(new fileData(file, stats.birthtime));
      return resolve(fileList);
    });
  });
};

/*파일 객체 정렬*/
const fileSort = async (files) => {
  return await files.sort(function (a, b) {
    if (a.stats < b.stats) {
      return 1;
    }
    if (a.stats > b.stats) {
      return -1;
    }

    return 0;
  });
};

const createLI = (file, list) => {
  return new Promise(async (resolve, reject) => {
    await list.push(
      `<li><a href='${file.name}'>${file.name}</a><span>${
      file.stats.getMonth() + 1
      }월${file.stats.getDate()}일</span></li>`
    );
    return resolve(list);
  });
};

const createUL = async (fileList) => {
  return new Promise(async (resolve, reject) => {
    let list = [];
    await fileList
      .reduce((previos, current) => {
        return previos.then(() => {
          return createLI(current, list);
        });
      }, Promise.resolve())
      .then(() => {
        return resolve(list);
      });
  });
};

/*순차적 promise 반환*/
const sequence = async (files, list) => {
  await files.reduce((accumulatorPromise, file) => {
    return accumulatorPromise.then(() => {
      return noticeData(file, list);
    });
  }, Promise.resolve());
};

// const fileLoad = async (target) => {
//   let fileList = [];
//   let ulList = ["<ul>"];
//   const files = await fileSearch(target);
//   await Promise.all(
//     files.map(async (file) => {
//       await creatList(target, file, fileList);
//     })
//   );
//   await fileSort(fileList);
//   await createUL(fileList, ulList);
//   return ulList.join("");
// };

const fileLoadNew = async (target) => {
  let fileList = [];

  return await fileSearch(target)
    .then(async (files) => {
      await Promise.all(
        files.map(async (file) => {
          await creatList(target, file, fileList);
        })
      );
    })
    .then(() => {
      return fileSort(fileList);
    })
    .then((list) => {
      return createUL(list);
    })
    .then((list) => {
      return list.join("");
    });
};

const dataLoad = async (target) => {
  return await fileSearch(target)
    .then(files => {
      return new Promise(async (resolve, reject) => {
        fs.readFile(`./assets/fileData/Lorem Ipsum/` + files[Math.floor(Math.random() * files.length)], 'utf8', function (err, data) {
          return resolve(data)
        })
      })
    })
}

module.exports = {
  fileLoad: fileLoadNew,
  dataLoad: dataLoad
};

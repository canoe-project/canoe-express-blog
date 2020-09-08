const fs = require("fs");
const { resolve } = require("path");

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
const creatFileList = (target, file, fileList) => {
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

const createUL = async (target, fileList) => {
  return new Promise(async (resolve, reject) => {
    let list = [];
    await fileList
      .reduce((previos, current) => {
        return previos.then(() => {
          switch (target) {
            case "Notice":
              return createLI(current, list);
              break;
            case "Writing":
              return createCardLI(target, current, list);
              break;
            case "Picture":
              return createPictureLI(target, current, list);
              break;
            default:
              break;
          }
        });
      }, Promise.resolve())
      .then(() => {
        return resolve(list);
      });
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

const createCardLI = (target, file, list) => {
  return new Promise(async (resolve, reject) => {
    await readJson(target, file).then((jsonFile) => {
      list.push(
        `<li>
          <div class="headCopy">
            <h3>${jsonFile.title}</h3>
            <div class="imfomation">
              <span class="star">${jsonFile.star}</span>
              <span class="view">${jsonFile.view}</span>
            </div> 
          </div>
          <div class="contentBody">
            <img class="blockContentImg" src="${jsonFile.image}">
            <div class="blockContent">${jsonFile.content.substr(0, 50)}</div>
          </div>
          <div class="blocDate">${new Date(jsonFile.date)
            .toISOString()
            .substring(0, 10)}</div>
        </li>
        `
      );
    });
    return resolve(list);
  });
};

const readJson = (target, file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`assets/fileData/${target}/${file.name}`, (err, data) => {
      return resolve(JSON.parse(data));
    });
  });
};

const createPictureLI = (target, file, list) => {
  return new Promise(async (resolve, reject) => {
    await readFild(target, file.name).then((image) => {
      list.push(
        `<li><img class="picture" src="${
          "data:image/jpeg;base64," + image
        }"></li>`
      );
    });
    return resolve(list);
  });
};

const readFild = (target, file) => {
  return new Promise(async (resolve, reject) => {
    fs.readFile(
      `./assets/fileData/${target}/${file}`,
      "base64",
      (err, data) => {
        return resolve(data);
      }
    );
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

const fileLoad = async (target) => {
  let fileList = [];

  return await fileSearch(target)
    .then(async (files) => {
      await Promise.all(
        files.map(async (file) => {
          await creatFileList(target, file, fileList);
        })
      );
    })
    .then(() => {
      return fileSort(fileList);
    })
    .then((list) => {
      return createUL(target, list);
    })
    .then((list) => {
      return list.join("");
    });
};

const randomTextLoad = async (target) => {
  return await fileSearch(target).then((files) => {
    return new Promise(async (resolve, reject) => {
      fs.readFile(
        `./assets/fileData/${target}/` +
          files[Math.floor(Math.random() * files.length)],
        "utf8",
        function (err, data) {
          return resolve(data);
        }
      );
    });
  });
};

module.exports = {
  fileLoad: fileLoad,
  randomTextLoad: randomTextLoad,
};

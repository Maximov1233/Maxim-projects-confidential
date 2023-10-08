import { encoded, translations } from './data.js';

const decoding = (obj) => {
    let newArr = [];
    obj.forEach((item) => {
        let objKeys = Object.entries(item),
            itemCopy = item;

        for (let i = 0; i < objKeys.length; i++) {
            let key = objKeys[i],
            keyName = key[0],
            keyValue = key[1];

            if (keyName !== 'groupId' &&
                keyName !== 'service' &&
                keyName !== 'formatSize' &&
                keyName !== 'ca') {

                let translationsArr = Object.entries(translations);

                for (let j = 0; j < translationsArr.length; j++) {

                    let translation = translationsArr[j],
                    translationNumericKey = translation[0],
                    translationValue = translation[1];
                    
                    if (keyValue === translationNumericKey) {
                        itemCopy[keyName] = translationValue;
                    }
                }
            };
        }

        newArr.push(itemCopy);
    });

    return newArr;
};

console.log(decoding(encoded));

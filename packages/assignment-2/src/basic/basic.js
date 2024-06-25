export function shallowEquals(target1, target2) {
  // 타입이 다르다면 false
  if (typeof target1 !== typeof target2) {
    return false;
  }

  // 기본형 비교
  if (
    typeof target1 === "number" ||
    typeof target1 === "boolean" ||
    typeof target1 === "bigint" ||
    typeof target1 === "string" ||
    typeof target1 === "symbol" ||
    typeof target1 === "undefined"
  ) {
    return target1 === target2;
  }

  // type이 object인 것 비교
  if (typeof target1 === "object") {
    // null 비교
    if (target1 === null || target2 === null) {
      return target1 === target2;
    }

    // 배열 비교
    if (Array.isArray(target1) && Array.isArray(target2)) {
      if (target1.length !== target2.length) {
        return false;
      }

      for (let i = 0; i < target1.length; i++) {
        if (target1[i] !== target2[i]) {
          return false;
        }
      }
      return true;
    }

    // 배열과 객체가 섞여 있는 경우 false
    if (Array.isArray(target1) !== Array.isArray(target2)) {
      return false;
    }

    // 객체 비교
    const keys1 = Object.keys(target1);
    const keys2 = Object.keys(target2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (target1[key] !== target2[key]) {
        return false;
      }
    }

    // 객체의 프로토타입 비교 (=클래스 인스턴스 비교)
    if (Object.getPrototypeOf(target1) !== Object.getPrototypeOf(target2)) {
      return false;
    }

    // Number, String 객체 비교 //왜 일반 객체랑 비교가 다를까?
    if (
      (target1 instanceof Number && target2 instanceof Number) ||
      (target1 instanceof String && target2 instanceof String)
    ) {
      return target1 === target2;
      //왜 false가 나와야할까..?
      //원시값 비교하면 true가 나오는데.. 원시값 비교가 얕은 비교인지 깊은 비교인지..?
    }

    return true;
  }

  return false;
}

const compareArrayElement = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (!deepEquals(array1[i], array2[i])) {
      return false;
    }
  }

  return true;
};

const compareObjectElement = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!deepEquals(object1[key], object2[key])) {
      return false;
    }
  }

  return true;
};

export function deepEquals(target1, target2) {
  // 타입이 다르다면 false
  if (typeof target1 !== typeof target2) {
    return false;
  }

  // 기본형 비교
  if (
    typeof target1 === "number" ||
    typeof target1 === "boolean" ||
    typeof target1 === "bigint" ||
    typeof target1 === "string" ||
    typeof target1 === "symbol" ||
    typeof target1 === "undefined"
  ) {
    return target1 === target2;
  }

  // type이 object인 것 비교
  if (typeof target1 === "object") {
    // null 비교
    if (target1 === null || target2 === null) {
      return target1 === target2;
    }

    // 배열과 객체가 섞여 있는 경우 false
    if (Array.isArray(target1) !== Array.isArray(target2)) {
      return false;
    }

    // 객체의 프로토타입 비교 (=클래스 인스턴스 비교)
    if (Object.getPrototypeOf(target1) !== Object.getPrototypeOf(target2)) {
      return false;
    }

    //Number, String 객체 간 비교
    if (
      (target1 instanceof Number && target2 instanceof Number) ||
      (target1 instanceof String && target2 instanceof String)
    ) {
      return target1 === target2;
    }

    //배열, 객체 간 깊은 비교
    if (Array.isArray(target1) && Array.isArray(target2)) {
      return compareArrayElement(target1, target2);
    }

    return compareObjectElement(target1, target2);
  }

  return false;
}

export function createNumber1(n) {
  return new Number(n);
}

export function createNumber2(n) {
  return new String(n);
}

export function createNumber3(n) {
  return n;
}

export class CustomNumber {}

export function createUnenumerableObject(target) {
  return target;
}

export function forEach(target, callback) {}

export function map(target, callback) {}

export function filter(target, callback) {}

export function every(target, callback) {}

export function some(target, callback) {}

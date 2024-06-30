/**
 *
 * @param {string} type
 * @param {object} props
 * @param {any[]} children
 * @returns {{ type: string, props: object, children: any[] }}
 */
export function jsx(type, props, ...children) {
  return { type, props, children };
}

/**
 * @param {string | { type: string, props: object, children: any[] }} node
 */
function createElement(node) {
  if (typeof node === 'string') return document.createTextNode(node);

  const element = document.createElement(node.type);

  Object.entries(node?.props ?? {}).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  node.children
    .map(createElement)
    .forEach((child) => element.appendChild(child));

  return element;
}

function updateAttributes(target, newProps, oldProps) {
  // newProps들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target에 해당 속성을 새 값으로 설정
  // oldProps을 반복하여 각 속성 확인
  //   만약 newProps들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps들에 해당 속성이 존재하지 않는다면
  //     target에서 해당 속성을 제거
}

/**
 *
 * @param {HTMLElement} parent
 * @param {null | string | { type: string, props: object, children: any[] }=} newNode
 * @param {null | string | { type: string, props: object, children: any[] }=} oldNode
 * @param {number=} index
 */
export function render(parent, newNode, oldNode, index = 0) {
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  //   종료
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }

  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if (newNode && !oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (typeof newNode === 'string' && typeof oldNode === 'string') {
    if (newNode === oldNode) return;

    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (!Object.is(newNode?.type, oldNode?.type)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 5. newNode와 oldNode에 대해 updateAttributes 실행

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  const maxLength = Math.max(
    newNode?.children?.length ?? 0,
    oldNode?.children?.length ?? 0
  );
  for (let i = 0; i < maxLength; i++) {
    render(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    );
  }
}

/**
 *
 * @param {Array} array1
 * @param {Array} array2
 */
function getLongerArray(array1, array2) {
  if (!!array1 || !!array2) return [];

  return array1.length > array2.length ? array1 : array2;
}

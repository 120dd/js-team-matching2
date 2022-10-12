import { SELECTORS } from "./constants.js";

export const TEMPLATES = {
    HEADER: `
    <header>
    <h1>우테코 크루와 팀 매칭 관리 보드</h1>
    <nav>
      <ul>
        <li>
          <button id=${SELECTORS.CREW_TAB}>크루 관리</button>
        </li>
        <li>
          <button id=${SELECTORS.TEAM_TAB}>팀 매칭 관리</button>
        </li>
      </ul>
    </nav>
    </header>
    `,
    MAIN: `<main id=${SELECTORS.MAIN}></main>`,
    COURSE_SELECT_SECTION: `
    <section>
      <h3>크루를 관리할 코스를 선택해주세요</h3>
      <div>
        <input id="frontend-course" type="radio" name="course" value="frontend" />
        <label for="frontend">프론트엔드</label>
        <input id="backend-course" type="radio" name="course" value="backend" />
        <label for="backend">백엔드</label>
      </div>
    </section>
    <div id=${SELECTORS.COURSE_SELECT_DETAIL}></div>
    `,
    COURSE_DETAIL_SECTION: (courseName, crewList) => `
    <section>
      <h3>${courseName} 크루 관리</h3>
      <form>
        <label>크루 이름</label>
        <input id="crew-name-input" type="text" />
        <button id="add-crew-button">확인</button>
      </form>
    </section>
    <section>
      <h3>${courseName} 크루 목록</h3>
      <table id="crew-table" border="1">
        <thead>
          <tr>
            <th></th>
            <th>크루</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          ${TEMPLATES.CREW_TABLE_ITEM(crewList)}
        </tbody>
      </table>
    </section>
    `,
    CREW_TABLE_ITEM: (crewList) => crewList.map((crewName, idx) => `
    <tr>
        <td>${idx + 1}</td>
            <td>${crewName}</td>
            <td>
              <button data-idx=${idx} class="delete-crew-button">삭제</button>
            </td>
          </tr>
    `).join(""),
}
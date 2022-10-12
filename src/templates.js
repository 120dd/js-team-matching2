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
    MAIN: `<main></main>`,
    
}
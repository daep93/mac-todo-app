# Vue3 + Vite + TypeScript + Electron

Vite를 활용하여 Vue와 Electron을 결합한 보일러플레이트를 구성하였습니다.

`yarn run build`를 통해 electron의 main 프로세스와 preload, vue로 작성한 앱을 빌드할 수 있으며 `yarn run start`를 통해 빌드 결과물을 실행 해볼 수 있습니다.

hot-reload를 위해서 `yarn run dev` 명령어도 준비했습니다만 vue 앱에 수정 사항은 감지하지 않고 있습니다. 이 부분은 향후 보완되어야 한다고 생각은 하고 있습니다.

데스크탑 앱을 만드는 툴은 electron-forge로 선택했으며 `yarn run make`를 하면 앱을 만들 수 있습니다.

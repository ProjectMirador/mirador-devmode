import Mirador from 'mirador/dist/es/src/index';
import MiradorDevmode from './MiradorDevmode';

export default [
  {
    target: 'OpenSeadragonViewer',
    mode: 'add',
    component: MiradorDevmode.Viewer,
  },
  {
    companionWindowKey: 'devmode',
    component: MiradorDevmode.Panel,
    mapStateToProps: (state, { windowId }) => ({
      manifest: Mirador.selectors.getManifest(state, { windowId }),
      manifestId: Mirador.selectors.getWindow(state, { windowId }).manifestId,
    }),
    mapDispatchToProps: {
      receiveManifest: Mirador.actions.receiveManifest,
    },
  },
  {
    component: MiradorDevmode.SidebarButton,
    mode: 'add',
    target: 'WindowSideBarButtons',
  },
];

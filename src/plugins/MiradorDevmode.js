import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import RestoreSharpIcon from '@material-ui/icons/RestoreSharp';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
import SaveAltSharpIcon from '@material-ui/icons/SaveAltSharp';
import DeveloperBoardSharpIcon from '@material-ui/icons/DeveloperBoardSharp';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';

const MiradorDevmode = {};

MiradorDevmode.Viewer = ({ viewer }) => {
  const target = useCallback((node) => {
    if (node) node.viewer = viewer; // eslint-disable-line
  });

  return <div className="viewer-ref" ref={target} />;
};

MiradorDevmode.Viewer.propTypes = {
  viewer: PropTypes.object, // eslint-disable-line
};

MiradorDevmode.Viewer.defaultProps = {
  viewer: null,
};

MiradorDevmode.Panel = ({ id, manifest, manifestId, receiveManifest, windowId }) => {
  const storedValue = manifest && JSON.stringify({ ...manifest.json, __original: null }, null, 2);

  const [value, setValue] = React.useState(storedValue);

  const updateManifest = (text) => {
    const json = { ...JSON.parse(text), __original: manifest.json.__original };
    return receiveManifest(manifestId, json);
  }
  const handleChange = (event) => {
    setValue(event.target.value);
    try {
      updateManifest(event.target.value);
    } catch(ex) { console.log(ex) }
  };

  const handleCancel = (event) => {
    setValue(storedValue);
  };

  const handleRevert = (event) => {
    if (!manifest || !manifest.json || !manifest.json.__original) return;

    setValue(manifest.json.__original);
    updateManifest(manifest.json.__original);
  };
  const handleSave = (event) => {
    updateManifest(value);
  };

  return (
    <CompanionWindow
      id={id}
      windowId={windowId}
      title="Dev Mode"
      titleControls={(
        <div>
          <IconButton onClick={handleRevert}><RestoreSharpIcon /></IconButton>
          <IconButton onClick={handleCancel}><CancelPresentationSharpIcon /></IconButton>
          <IconButton onClick={handleSave}><SaveAltSharpIcon /></IconButton>
        </div>
      )}
    >
      <TextField
        fullWidth
        multiline
        value={value}
        onChange={handleChange}
        style={{ padding: 8 }}
        inputProps={{ style: { fontFamily: '"Lucida Console", Monaco, monospace' } }}
      />
    </CompanionWindow>
  );
};

MiradorDevmode.SidebarButton = () => {
  return <DeveloperBoardSharpIcon />;
};

MiradorDevmode.SidebarButton.value = 'devmode';

export default MiradorDevmode;

import React from 'react';
import {
  ProfileContext,
  addProfile
} from 'contexts/Profile';
import { viewProfileList, goBackOrHome } from 'app/routes';
import {
  PrimaryButton,
  CancelButton
} from 'components/common/common.style';
import {
  ListTextArea,
  ProfileContainer,
  ProfileCard,
  ProfileName,
} from './EditProfile.style';

// 4 spaces, because tabs are difficult in browsers.
const SEPARATOR = '    ';

function EditProfileComponent({ history }) {
  const { state, dispatch } = React.useContext(ProfileContext);
  console.log(state);
  const [titleText, setTitleText] = React.useState('');
  const [listText, setListText] = React.useState('');

  // TODO TRANSLATIONS
  const listLabel = 'List of comparable items';
  const listPlaceholder = '"Item 1"    [Optional: <4-spaces> Image-URL]\n' +
    '"Item 2"    [Optional: <4-spaces> Image-URL]\n' +
    '"Item 3"    [Optional: <4-spaces> Image-URL]\n' +
    '\n\n' +
    'Recommended for lists under 500 (249,001 comparisons)\n' +
    '...';
  const listMin = 10;
  const listMax = 20;

  const profileNameLabel = "List Name";
  const profileNamePlaceholder = "What's the name of this Profile?";


  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileName
          aria-label={profileNameLabel}
          label={profileNameLabel}
          placeholder={profileNamePlaceholder}
          helperText=""
          variant="outlined"
          onChange={(e) => {
            setTitleText(e.target.value);
          }}
        />
        <ListTextArea
          aria-label={listLabel}
          label={listLabel}
          multiline
          rows={listMin}
          rowsMax={listMax}
          variant="outlined"
          placeholder={listPlaceholder}
          onChange={(e) => {
            setListText(e.target.value);
          }}
        />
      </ProfileCard>
      <CancelButton
        onClick={() => goBackOrHome(history)}
      >
        Back
      </CancelButton>
      <PrimaryButton
        onClick={() => {
          const list = listText.split('\n').map((row) => {
            const [name, image] = row.split(SEPARATOR);
            return { name, image };
          }).filter(({ name, image }) => name || image);
          console.log(list);
          // TODO actual profile.
          dispatch(addProfile(titleText, list));
          // TODO push to next.
          history.push(viewProfileList);
        }}
        disabled={!listText.trim() || !titleText.trim()}
      >
        Save
      </PrimaryButton>
    </ProfileContainer>
  );
}

export default EditProfileComponent;

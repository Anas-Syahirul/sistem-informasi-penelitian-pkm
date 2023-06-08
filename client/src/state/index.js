import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  user: null,
  // user: {
  //   username: 'Anas Syahirul',
  //   email: 'anas333@gmail.com',
  //   role: 'Dosen',
  //   nip: '09809709870',
  //   profilePicture:
  //     'http://res.cloudinary.com/dt9mpchlg/image/upload/v1680625238/user-image/c6bovkaeaxvdeks0d1t4.jpg',
  //   profilePictureId: 'namaPhoto',
  //   phone: '90980970',
  //   dateOfBirth: new Date('2001-08-07'),
  //   academicPosition: 'Guru Besar',
  //   expertField: ['listri besar', 'listrik kecil'],
  // },
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setEditProfile: (state, action) => {
      state.user = action.payload.user;
      // state.user.email = action.payload.email;
      // state.user.role = action.payload.role;
      // state.user.nip = action.payload.nip;
      // state.user.phone = action.payload.phone;
      // state.user.academicPosition = action.payload.academicPosition;
      // state.user.dateOfBirth = action.payload.dateOfBirth;
      // state.user.expertField = action.payload.expertField;
    },
    setEditProfPict: (state, action) => {
      state.user.profilePicture = action.payload.profilePicture;
      state.user.profilePictureId = action.payload.profilePictureId;
    },
  },
});

export const { setMode, setLogin, setLogout, setEditProfile, setEditProfPict } =
  authSlice.actions;

export default authSlice.reducer;

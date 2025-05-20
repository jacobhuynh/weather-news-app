// import React from 'react';
// import { useState } from 'react';

// const LocationForm = ({ handleUserData }) => {
//     const [formData, setFormData] = useState({
//         city: '',
//         state: '',
//         country: ''    
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         handleUserData(formData);
//     };
    
//     return (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>City:</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>State:</label>
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Country:</label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       );
// };

// export default LocationForm

import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Stack } from '@mui/material';

const LocationForm = ({ handleUserData }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleUserData(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#d1dff6',
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="City"
          {...register('city', { required: true })}
          fullWidth
        />
        <TextField
          label="State"
          {...register('state', { required: true })}
          fullWidth
        />
        <TextField
          label="Country"
          {...register('country', { required: true })}
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{backgroundColor: '#92b6f0'}}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default LocationForm;
1. Install Required Packages
In your React project directory, run:

```bash
npm install react-bootstrap bootstrap react-bootstrap-icons
```


2. Adding Components
Copy the following components from this repository into your src/components/ folder:

TrainingModal.js
ManageResources.js
ManageSchedules.js
TrainingCalendar.js
TrainingHome.js
Ensure you import them into the main app component or where they are needed.

```javascript
import TrainingModal from "./components/TrainingModal";
```


3. Adding Styles
Add the provided styles.css to your project and link it in your main index.js:

```javascript
import './styles.css';
```


4. Running the Application
Run the following command to start your React app:

```bash
npm start
```


Visit http://localhost:3000 in your browser to see the app running.

5. Customizing the Components
The components use Bootstrap tables and icons. Feel free to modify the component logic and data to suit your needs. You can easily add more facilitators, schedule items, or ticket options through the hard-coded arrays in the components.

Example:
Here is how to use TrainingModal:

```javascript
import React, { useState } from 'react';
import TrainingModal from './components/TrainingModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)}>Open Training Modal</button>
      <TrainingModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
}

export default App;
```


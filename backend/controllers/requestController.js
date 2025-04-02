const Project = require('../models/Project');
const Assignment = require('../models/Assignment');
const ProjectRequest = require('../models/ProjectRequest'); // Import missing model
const User = require('../models/User'); // Ensure you have the correct User model import


exports.submitProjectRequest = async (req, res) => {
  const {clientId, projectTitle, projectDescription } = req.body;
  const projectStatusUrl = `/track/${Date.now()}`;
  console.log("ClientID:", clientId)


  try {
    const user = await User.findById(clientId);


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newRequest = new ProjectRequest({
      clientId, // Assign the found user's ID as clientId
      projectTitle,
      clientName: user.name,
      phoneNumber:user.phoneNumber,
      email: user.email,
      projectDescription,
      requestStatus: 'Pending',
      projectStatusUrl,
    });

    await newRequest.save();
    res.status(201).json({ requestId: newRequest._id, projectStatusUrl });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting request', error: err.message });
  }
};

exports.getClientProjectRequests = async (req, res) => {

    const { clientId } = req.params;  // ✅ Correct

  console.log("C",clientId)
  try {
    const requests = await ProjectRequest.find({ clientId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

exports.getAllProjectRequests = async (req, res) => {
    console.log("Gett ALl")
  try {
    const requests = await ProjectRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

exports.approveProjectRequest = async (req, res) => {
    console.log("Approve ahead");
    const { requestId } = req.params;
    const { developerIds, price } = req.body; // Accept price in request

    try {
        // Find the project request by ID
        const request = await ProjectRequest.findById(requestId);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Find the client details
        const client = await User.findById(request.clientId);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        // Update the request with additional details
        request.requestStatus = 'Approved';
        request.clientName = client.name;
        request.registeredId = client._id; // Assuming the registered ID is the client's ID
        request.price = price;
        request.developers = developerIds; // Store assigned developers as an array

        await request.save();

        // Create a new project with the approved request details
        const newProject = new Project({
            clientId: request.clientId,
            clientName: request.clientName,
            projectTitle: request.projectTitle,
            projectDescription: request.projectDescription,
            projectStatus: 'Pending', // Set default status
            price: request.price,
            developers: request.developers
        });

        await newProject.save();

        res.status(200).json({
            message: 'Project request approved successfully and new project created',
            projectId: newProject._id,
            clientName: request.clientName,
            registeredId: request.registeredId,
            price: request.price,
            developers: request.developers,
        });

    } catch (err) {
        res.status(500).json({ message: 'Error approving request', error: err.message });
    }
};



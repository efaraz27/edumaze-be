const express = require("express");
const env = require("dotenv");
const app = express();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const multer = require("multer");

env.config();
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(multer().any());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/review-essay", async (req, res) => {
  try {
  
    const data = req.body

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a helpful assistant that reviews essays. which give straight forward essay reviews with improvements, suggestions and errors.
      Review the following essay: ${JSON.stringify(data)}
      `,
      temperature: 0,
      max_tokens: 500,
    });
    res.json({
      answer: response.data.choices[0].text,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/review-paper", async (req, res) => {
  try {
  
    const data = req.body

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a helpful assistant that reviews research papers. which give straight forward essay reviews with improvements, suggestions and errors.
      Review the following research paper: ${JSON.stringify(data)}
      `,
      temperature: 0,
      max_tokens: 500,
    });
    res.json({
      answer: response.data.choices[0].text,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/ask-doubt", async (req, res) => {
  try {
  
    const data = req.body

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a helpful assistant that helps answer doubts of students.
      answer the following doubt: ${JSON.stringify(data)}
      `,
      temperature: 0,
      max_tokens: 500,
    });
    res.json({
      answer: response.data.choices[0].text,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/generate-essay", async (req, res) => {
  try {
    //topic, target audience, formality, intent, domain
    const { problemStatement, targetAudience, formality, intent, domain } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a helpful assistant that generates essays that gives the essay only!.
            Generate an essay on the topic: ${problemStatement}
            Target audience: ${targetAudience}
            Formality: ${formality}
            Intent: ${intent}
            Domain: ${domain}
            `,
      temperature: 0,
      max_tokens: 500,
    });
    return res.json({
      essay: response.data.choices[0].text,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

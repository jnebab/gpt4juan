## GPT4Juan

This is an OpenAI GPT-4 based chatbot application built with Next.js 13, Vercel AI SDK, Typescript, and styled using TailwindCSS. The app allows users to interact with an AI assistant through a user-friendly interface.

Before you get started, you will need the following:

Node.js (version 18 or higher)
Yarn (or npm)
An OpenAI API key

### Getting Started

Follow these steps to set up and run the OpenAI chatbot app locally:

Clone the repository:

```bash
git clone https://github.com/jnebab/gpt4juan
```

```bash
cd gpt4juan
```

Install dependencies:

Using yarn:

yarn install
or using npm:

```bash
npm install
```

Create a .env.local file in the root directory of the project, and add your OpenAI API key:

```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

Run the development server:

Using yarn:

yarn dev
or using npm:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the app.

### Usage

To interact with the chatbot, simply enter your message in the input field and hit the "Enter" key. The AI will then respond with an appropriate message.

### Deploying to Vercel

Follow these steps to deploy the OpenAI chatbot app on Vercel:

Sign up for a Vercel account if you don't have one.

Install the Vercel CLI:

```bash
npm i -g vercel
```

Run the following command from the project directory and follow the prompts:

```bash
vercel
```

After the deployment is complete, you will receive a URL to access your live application.

### Contributing

Contributions are welcome! Please follow these steps to contribute:

Fork the repository.

Create a new branch with a descriptive name.

Make changes/add features.

Commit and push your changes.

Create a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

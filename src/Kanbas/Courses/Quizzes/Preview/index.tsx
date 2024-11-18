function Preview() {

    const fakeData = {
        _id: 1,
        title: "Q1 - HTML",
        started: "Nov 29 at 8:19 am",
        quiz_type: "Graded Quiz",
        points: 30,
        questions: [
            {
                id: 1,
                text: "An HTML label element can be associated with an HTML input element by setting their id attributes to the same value. The resulting effect is that when you click on the label text, the input element receives focus as if you had clicked on the input element itself.",
                options: ["True", "False"],
                correctAnswer: "True",
                points: 1
              },
              {
                id: 2,
                text: "What is the purpose of the 'alt' attribute in an image tag?",
                type: "Multiple Choice",
                options: [
                  "To specify the image source",
                  "To specify alternate text for an image",
                  "To specify the width of an image"
                ],
                correctAnswer: "To specify alternate text for an image",
                points: 2
              },
              {
                id: 3,
                text: "Fill in the blank: HTML is used to create _______.",
                type: "Fill in the Blank",
                correctAnswer: "web pages",
                points: 2
              }
        ]
    }
  return (
    <div>
      <h2>Question Title</h2>
      <p>This is preview of the published version of the quiz</p>
      <p>started time: Nov 29 at 9:19am</p>
      <p>Quiz Instructions</p>
      <div>
        Question Content
      </div>
      <div>
        Quiz Control / Submit Quiz
      </div>
      <div>
        Edit and other questions
      </div>
    </div>
  );
}

export default Preview;


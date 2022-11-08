from flask import Flask, render_template, request, session
app = Flask(__name__)
app.secret_key = 'SUPERSEKRETKEY'


@app.route("/")
def hello():
    session['question'] = 1
    return render_template('index.html')


@app.route("/quiz/")
def quiz():
    q = None
    qa = {
        "1":{
            "text":"Which is the best university in Edinburgh?",
            "answer":1,
            "answers":["Edinburgh Napier", "University of Edinburgh", "Heriott Watt", "Queen Mary" ]
        },
        "2":{
            "text":"Which is the best university in Scotland?",
            "answer":1,
            "answers":["Edinburgh Napier", "University of Edinburgh", "Heriott Watt", "Queen Mary" ]
        },
        "3":{
            "text":"Which is the best university in the UK?",
            "answer":1,
            "answers":["Edinburgh Napier", "University of Edinburgh", "Heriott Watt", "Queen Mary" ]
        },
        "4":{
            "text":"Which is the best university in the World?",
            "answer":1,
            "answers":["Edinburgh Napier", "University of Edinburgh", "Heriott Watt", "Queen Mary" ]
        }
    }
    try:
        if (session['question']):
            q = int(session['question'])
    except KeyError:
        q = 1

    answer = request.args.get('answer', None)
    if answer is not None:
        correct = qa.get(str(q)).get('answer')
        if str(answer) == str(correct):
            q = q+1
            session['question'] = q
            if q > len(qa):
                return render_template('success.html')
            else:
                return render_template('quiz.html', text=qa[str(q)]["text"], answers=qa[str(q)]["answers"], number=q)
        else:
            return render_template('wrong.html', text="Das ist der wrong answer!!!")
    else:
        return render_template('quiz.html', text=qa[str(q)]["text"], answers=qa[str(q)]["answers"], number=q)


@app.route("/success/")
def success():
    return render_template('success.html')
    

if __name__ == "__main__":
    app.run(host="0.0.0.0")


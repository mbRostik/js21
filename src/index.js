import React from 'react';
import ReactDOM from 'react-dom/client';

class Ex1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, text: "1", isChecked: false },
                { id: 2, text: "2", isChecked: false },
                { id: 3, text: "3", isChecked: false },
                { id: 4, text: "4", isChecked: false }
            ]
        };
    }

    handleCheckboxChange = (event, itemId) => {
        const { items } = this.state;
        const itemIndex = items.findIndex((item) => item.id === itemId);
        const updatedItem = { ...items[itemIndex], isChecked: event.target.checked };
        const updatedItems = [...items.slice(0, itemIndex), updatedItem, ...items.slice(itemIndex + 1)];
        this.setState({ items: updatedItems });
    };

    render() {
        const { items } = this.state;

        return (
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={item.isChecked}
                                onChange={(event) => this.handleCheckboxChange(event, item.id)}
                            />
                            <span style={{ textDecoration: item.isChecked ? "line-through" : "none" }}>{item.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
        );
    }
}

class Ex2 extends React.Component {
    state = {
        employees: [
            { id: 1, firstName: 'Eren', lastName: 'Jager', salary: 5000, isChecked: true },
            { id: 2, firstName: 'Aizen', lastName: 'Sosuke', salary: 6000, isChecked: true },
            { id: 3, firstName: 'Light', lastName: 'Yagami', salary: 4000, isChecked: true },
            { id: 4, firstName: 'Naruto', lastName: 'Uzumaki', salary: 7000, isChecked: true }
        ],
        totalSalary: 0
    };

    handleCheckboxChange = (id) => {
        const employees = [...this.state.employees];
        const index = employees.findIndex(emp => emp.id === id);
        employees[index].isChecked = !employees[index].isChecked;
        const totalSalary = employees.reduce((sum, emp) => sum + (emp.isChecked ? emp.salary : 0), 0);
        this.setState({ employees, totalSalary });
    };

    render() {
        const { employees, totalSalary } = this.state;
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Зарплата</th>
                            <th>Вибрати</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <Ex2_1 key={emp.id} employee={emp} onCheckboxChange={this.handleCheckboxChange} />
                        ))}
                    </tbody>
                </table>
                <p>Total salary: ${totalSalary}</p>
            </>
        );
    }
}

class Ex2_1 extends React.Component {
    handleCheckboxChange = () => {
        this.props.onCheckboxChange(this.props.employee.id);
    };

    render() {
        const { id, firstName, lastName, salary, isChecked } = this.props.employee;
        return (
            <tr>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>${salary}</td>
                <td><input type="checkbox" checked={isChecked} onChange={this.handleCheckboxChange} /></td>
            </tr>
        );
    }
}

class Ex3 extends React.Component {
    state = {
        array: ["paragraph 1", "paragraph 2", "paragraph 3", "paragraph 4"],
        checkboxes: [true, true, true, true]
    };

    toggleCheckbox = (index) => {
        const checkboxes = [...this.state.checkboxes];
        checkboxes[index] = !checkboxes[index];
        this.setState({ checkboxes });
    };

    render() {
        const { array, checkboxes } = this.state;
        return (
            <div>
                {array.map((item, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={checkboxes[index]}
                            onChange={() => this.toggleCheckbox(index)}
                        />
                        {checkboxes[index] && <p>{item}</p>}
                    </div>
                ))}
            </div>
        );
    }
}


class Ex4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { name: 'Hero', surname: '016', age: 30 },
                { name: 'Oni', surname: '02', age: 40 },
                { name: 'Levi', surname: 'Akerman', age: 50 },
            ],
            checkedIds: [],
        };
    }

    handleCheckboxChange = (userId) => {
        this.setState((prevState) => {
            let checkedIds = [...prevState.checkedIds];
            const index = checkedIds.indexOf(userId);
            if (index !== -1) {
                checkedIds.splice(index, 1);
            } else {
                checkedIds.push(userId);
            }
            return { checkedIds };
        });
    };

    render() {
        const { users, checkedIds } = this.state;
        return (
            <div>
                <ul>
                    {users.map((user) => (
                        <li key={user.name}>
                            <input
                                type="checkbox"
                                checked={checkedIds.includes(user.name)}
                                onChange={() => this.handleCheckboxChange(user.name)}
                            />
                            {checkedIds.includes(user.name)
                                ? `${user.name} ${user.surname} ${user.age}`
                                : user.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class Ex5 extends React.Component {
    render() {
        const { items } = this.props;

        return (
            <ul>
                {items.map((item, index) => (
                    <Ex5_1 key={index} text={item} />
                ))}
            </ul>
        );
    }
}

class Ex5_1 extends React.Component {
    state = {
        isEditing: false,
        text: this.props.text,
    };

    handleTextChange = (event) => {
        this.setState({ text: event.target.value });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({ isEditing: false });
        }
    };

    handleBlur = () => {
        this.setState({ isEditing: false });
    };

    handleClick = () => {
        this.setState({ isEditing: true });
    };

    render() {
        const { isEditing, text } = this.state;

        if (isEditing) {
            return (
                <li>
                    <input
                        type="text"
                        value={text}
                        onChange={this.handleTextChange}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleBlur}
                        autoFocus
                    />
                </li>
            );
        }

        return (
            <li onClick={this.handleClick}>
                {text}
            </li>
        );
    }
}

class Ex6 extends React.Component {
    state = {
        users: [
            { name: "Hero", age: 30 },
            { name: "Oni", age: 40 },
            { name: "Levi", age: 50 }
        ]
    };

    handleNameChange = (index, event) => {
        const { value } = event.target;
        this.setState(prevState => {
            const users = [...prevState.users];
            users[index].name = value;
            return { users };
        });
    };

    handleAgeChange = (index, event) => {
        const { value } = event.target;
        this.setState(prevState => {
            const users = [...prevState.users];
            users[index].age = value;
            return { users };
        });
    };

    handleEdit = (index) => {
        this.setState(prevState => {
            const users = [...prevState.users];
            users[index].isEditing = !users[index].isEditing;
            return { users };
        });
    };

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Вік</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                {user.isEditing ? (
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(event) => this.handleNameChange(index, event)}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {user.isEditing ? (
                                    <input
                                        type="number"
                                        value={user.age}
                                        onChange={(event) => this.handleAgeChange(index, event)}
                                    />
                                ) : (
                                    user.age
                                )}
                            </td>
                            <td>
                                <button onClick={() => this.handleEdit(index)}>
                                    {user.isEditing ? "Зберегти" : "Редагувати"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}


class Ex7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                { id: 1, name: 'Hlyboka' },
                { id: 2, name: 'Chernivtsi' },
                { id: 3, name: 'Shuganshuna' },
            ],
            selectedRouteId: null,
        };
    }

    handleRouteChange = (event) => {
        this.setState({ selectedRouteId: event.target.value });
    };

    render() {
        const { routes, selectedRouteId } = this.state;
        const selectedRoute = routes.find((route) => route.id == selectedRouteId);

        return (
            <div>
                <h3>Маршрути:</h3>
                <form>
                    {routes.map((route) => (
                        <div key={route.id}>
                            <input
                                type="radio"
                                id={`route-${route.id}`}
                                name="route"
                                value={route.id}
                                onChange={this.handleRouteChange}
                            />
                            <label htmlFor={`route-${route.id}`}>{route.name}</label>
                        </div>
                    ))}
                </form>
                <p>
                    {selectedRouteId
                        ? `Chosen root: ${selectedRoute.name}`
                        : 'Не вибрано жодного маршруту'}
                </p>
            </div>
        );
    }
}

class Ex8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            text: '',
        };
    }

    handleTextChange = (event) => {
        this.setState({ text: event.target.value });
    };

    handleAddNote = () => {
        const { notes, text } = this.state;
        const newNote = {
            id: Date.now(),
            title: `Note ${notes.length + 1}`,
            text,
            timestamp: new Date().toLocaleString(),
        };
        this.setState({ notes: [...notes, newNote], text: '' });
    };

    handleDeleteNote = (id) => {
        const { notes } = this.state;
        const newNotes = notes.filter((note) => note.id !== id);
        this.setState({ notes: newNotes });
    };

    handleEditNote = (id, newText) => {
        const { notes } = this.state;
        const newNotes = notes.map((note) => {
            if (note.id === id) {
                return { ...note, text: newText };
            }
            return note;
        });
        this.setState({ notes: newNotes });
    };

    render() {
        const { notes, text } = this.state;

        return (
            <div>
                <h1>Записник</h1>
                <textarea value={text} onChange={this.handleTextChange} />
                <br />
                <button onClick={this.handleAddNote}>Добавити</button>
                <br />
                {notes.map((note) => (
                    <div key={note.id}>
                        <h2>{note.title}</h2>
                        <p>Created at: {note.timestamp}</p>
                        <p>{note.text}</p>
                        <button onClick={() => this.handleEditNote(note.id, 'New text')}>
                            Edit
                        </button>
                        <button onClick={() => this.handleDeleteNote(note.id)}>Delete</button>
                    </div>
                ))}
            </div>
        );
    }
}

class Ex9 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { id: 1, firstName: 'Erwin', lastName: 'Smith', salary: 1000 },
                { id: 2, firstName: 'Mikasa', lastName: 'Akerman', salary: 1200 },
                { id: 3, firstName: 'Obito', lastName: 'Uchiha', salary: 800 },
                { id: 4, firstName: 'Jiraiya', lastName: 'Pervert', salary: 1500 },
            ],
            sortField: '',
            sortDirection: 'asc',
        };
    }

    handleSort = (field) => {
        const { sortDirection } = this.state;

        
        if (field === this.state.sortField) {
            this.setState({
                sortDirection: sortDirection === 'asc' ? 'desc' : 'asc',
            });
        } else {
            
            this.setState({
                sortField: field,
                sortDirection: 'asc',
            });
        }
    };

    render() {
        const { employees, sortField, sortDirection } = this.state;

        
        const sortedEmployees = employees.sort((a, b) => {
            const sortMultiplier = sortDirection === 'asc' ? 1 : -1;
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue < bValue) {
                return -1 * sortMultiplier;
            }
            if (aValue > bValue) {
                return 1 * sortMultiplier;
            }
            return 0;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={() => this.handleSort('firstName')}>Ім'я</th>
                        <th onClick={() => this.handleSort('lastName')}>Прізвище</th>
                        <th onClick={() => this.handleSort('salary')}>Зарплата</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

class Ex10 extends React.Component {
    state = {
        language: 'ukrainian',
    };

    handleLanguageChange = (event) => {
        this.setState({ language: event.target.value });
    };

    render() {
        const { language } = this.state;

        const ukrainianDaysOfWeek = [
            'Понеділок',
            'Вівторок',
            'Середа',
            'Четвер',
            'П\'ятниця',
            'Субота',
            'Неділя',
        ];

        const englishDaysOfWeek = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];

        return (
            <div>
                <label>
                    Виберіть мову:
                    <select value={language} onChange={this.handleLanguageChange}>
                        <option value="ukrainian">Українська</option>
                        <option value="english">Англійська</option>
                    </select>
                </label>
                <br />
                <label>
                    Виберіть день тижня:
                    <select>
                        {language === 'ukrainian' ? (
                            ukrainianDaysOfWeek.map((day, index) => (
                                <option key={index} value={day}>
                                    {day}
                                </option>
                            ))
                        ) : (
                            englishDaysOfWeek.map((day, index) => (
                                <option key={index} value={day}>
                                    {day}
                                </option>
                            ))
                        )}
                    </select>
                </label>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
        <p>Ex1</p>
        <Ex1 />

        <p>Ex2</p>
        <Ex2 />

        <p>Ex3</p>
        <Ex3 />

        <p>Ex4</p>
        <Ex4 />

        <p>Ex5</p>
        <Ex5 items={['Нажми і відредагуй', 'Щось потрібно зробити?', 'Так, нажми і дізнаєшся']} />

        <p>Ex6</p>
        <Ex6 />

        <p>Ex7</p>
        <Ex7 />

        <p>Ex8</p>
        <Ex8 />

        <p>Ex9 потібно нажати на назву колонки, щоб відсортувати по тій, чи іншій колонці</p>
        <Ex9 />
        <p>Ex10</p>
        <Ex10 />


    </div>

);
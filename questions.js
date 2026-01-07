// 题库数据
const questionData = {
    multipleChoice: [
        {
            question: 'Which of the following is the correct abbreviation for "Hypertext Transfer Protocol"?',
            options: ['A. HTML', 'B. HTTP', 'C. HTP', 'D. HTTPS'],
            answer: 'B',
            explanation: 'HTTP stands for Hypertext Transfer Protocol, which is the foundation of data communication on the web.'
        },
        {
            question: 'A ____ is a set of instructions that tells a computer what to do.',
            options: ['A. program', 'B. database', 'C. network', 'D. sensor'],
            answer: 'A',
            explanation: 'A program is a collection of instructions that a computer executes to perform specific tasks.'
        },
        {
            question: 'The term "IoT" stands for ____.',
            options: ['A. Internet of Things', 'B. Input Output Technology', 'C. Information Overlay Technique', 'D. Interactive Online Terminal'],
            answer: 'A',
            explanation: 'IoT (Internet of Things) refers to the network of physical devices connected to the internet.'
        },
        {
            question: 'In computer networking, a ____ is a device that forwards data packets between computer networks.',
            options: ['A. router', 'B. modem', 'C. switch', 'D. hub'],
            answer: 'A',
            explanation: 'A router forwards data packets between different networks and determines the best path for data transmission.'
        },
        {
            question: 'Which of the following is a programming language?',
            options: ['A. Windows', 'B. Python', 'C. Excel', 'D. PowerPoint'],
            answer: 'B',
            explanation: 'Python is a high-level programming language known for its simplicity and versatility.'
        },
        {
            question: 'The ____ of a computer is where data is stored for long-term use.',
            options: ['A. RAM', 'B. CPU', 'C. hard drive', 'D. motherboard'],
            answer: 'C',
            explanation: 'Hard drives provide persistent storage for data even when the computer is turned off.'
        },
        {
            question: 'A ____ is a collection of related data organized in a specific way.',
            options: ['A. file', 'B. folder', 'C. database', 'D. registry'],
            answer: 'C',
            explanation: 'A database is a structured collection of data that can be easily accessed, managed, and updated.'
        },
        {
            question: '____ is the process of converting data into a secret code to prevent unauthorized access.',
            options: ['A. Encryption', 'B. Decryption', 'C. Compression', 'D. Decompression'],
            answer: 'A',
            explanation: 'Encryption transforms readable data into an encoded format that can only be read with the correct key.'
        },
        {
            question: 'A ____ is a small piece of software that adds specific functionality to a larger program.',
            options: ['A. patch', 'B. plugin', 'C. virus', 'D. worm'],
            answer: 'B',
            explanation: 'Plugins are software components that extend the capabilities of an existing application.'
        },
        {
            question: 'The ____ layer in the OSI model is responsible for network addressing and routing.',
            options: ['A. physical', 'B. data link', 'C. network', 'D. transport'],
            answer: 'C',
            explanation: 'The network layer (Layer 3) handles logical addressing (IP) and routing of data packets.'
        },
        {
            question: 'Which of the following is an example of an operating system?',
            options: ['A. Google Chrome', 'B. Android', 'C. Adobe Photoshop', 'D. Mozilla Firefox'],
            answer: 'B',
            explanation: 'Android is a mobile operating system developed by Google.'
        },
        {
            question: 'A ____ is a computer program that replicates itself and spreads to other computers.',
            options: ['A. Trojan horse', 'B. Spyware', 'C. Malware', 'D. Worm'],
            answer: 'D',
            explanation: 'A worm is a standalone malware that replicates itself to spread to other computers without human intervention.'
        },
        {
            question: 'The speed at which a computer can process data is measured in ____.',
            options: ['A. hertz', 'B. bits per second', 'C. bytes', 'D. gigabytes'],
            answer: 'A',
            explanation: 'CPU speed is measured in Hertz (Hz), typically in GHz (gigahertz).'
        },
        {
            question: 'A ____ is a device that allows a computer to communicate with other computers over a network.',
            options: ['A. NIC (Network Interface Card)', 'B. GPU (Graphics Processing Unit)', 'C. PSU (Power Supply Unit)', 'D. DVD-ROM'],
            answer: 'A',
            explanation: 'A Network Interface Card enables a computer to connect to a network and communicate with other devices.'
        },
        {
            question: '____ is a type of computer memory that is volatile and loses its data when the power is turned off.',
            options: ['A. ROM', 'B. RAM', 'C. Cache', 'D. HDD'],
            answer: 'B',
            explanation: 'RAM (Random Access Memory) is volatile memory that stores data temporarily while the computer is running.'
        },
        {
            question: 'The "WWW" in a web address stands for ____.',
            options: ['A. World Wide Web', 'B. Wide World Web', 'C. Web Wide World', 'D. World Web Wide'],
            answer: 'A',
            explanation: 'WWW stands for World Wide Web, a system of interlinked hypertext documents accessed via the Internet.'
        },
        {
            question: 'Which of the following is NOT a programming language commonly used in IoT development?',
            options: ['A. Python', 'B. Java', 'C. Ruby', 'D. C++'],
            answer: 'C',
            explanation: 'While Ruby is a programming language, Python, Java, and C++ are more commonly used in IoT development.'
        },
        {
            question: 'What does "MQTT" stand for in the context of IoT?',
            options: ['A. Message Queuing Telemetry Transport', 'B. Massive Quantity of Things Transfer', 'C. Mobile Query Telemetry Tool', 'D. Modular Quality Tracking'],
            answer: 'A',
            explanation: 'MQTT is a lightweight messaging protocol designed for IoT devices with limited resources.'
        },
        {
            question: 'In the context of cloud computing, IaaS stands for:',
            options: ['A. Infrastructure as a Service', 'B. Information as a Service', 'C. Integration as a Service', 'D. Intelligent as a Service'],
            answer: 'A',
            explanation: 'IaaS provides virtualized computing resources over the internet, including servers, storage, and networking.'
        },
        {
            question: 'Which protocol is primarily used for secure communication over the internet?',
            options: ['A. FTP', 'B. HTTP', 'C. HTTPS', 'D. SSH'],
            answer: 'C',
            explanation: 'HTTPS (HTTP Secure) encrypts the communication between web browsers and websites.'
        },
        {
            question: 'The process of converting analog signals to digital signals is known as:',
            options: ['A. Encoding', 'B. Decoding', 'C. Digitization', 'D. Compression'],
            answer: 'C',
            explanation: 'Digitization is the process of converting analog information into digital format.'
        },
        {
            question: 'Which of the following is a type of NoSQL database?',
            options: ['A. MySQL', 'B. PostgreSQL', 'C. MongoDB', 'D. SQL Server'],
            answer: 'C',
            explanation: 'MongoDB is a document-oriented NoSQL database that stores data in JSON-like documents.'
        },
        {
            question: 'The IoT device that collects data from the environment is called:',
            options: ['A. Sensor', 'B. Actuator', 'C. Gateway', 'D. Cloud platform'],
            answer: 'A',
            explanation: 'Sensors detect and measure physical properties from the environment, such as temperature or motion.'
        },
        {
            question: 'In the context of data analytics, what does "ETL" stand for?',
            options: ['A. Extract, Transform, Load', 'B. Enhance, Track, Locate', 'C. Evaluate, Trend, Link', 'D. Expand, Transfer, Link'],
            answer: 'A',
            explanation: 'ETL is a data integration process that extracts data from sources, transforms it, and loads it into a destination.'
        },
        {
            question: 'Which of the following is a lightweight messaging protocol designed for small devices?',
            options: ['A. AMQP', 'B. CoAP', 'C. XMPP', 'D. SMTP'],
            answer: 'B',
            explanation: 'CoAP (Constrained Application Protocol) is designed for resource-constrained IoT devices.'
        },
        {
            question: 'The process of sending data from an IoT device to a cloud service is known as:',
            options: ['A. Data ingestion', 'B. Data visualization', 'C. Data transmission', 'D. Data aggregation'],
            answer: 'A',
            explanation: 'Data ingestion is the process of importing data from IoT devices into a cloud platform for processing.'
        },
        {
            question: 'What does "REST" stand for in web services?',
            options: ['A. Representational State Transfer', 'B. Remote Service Transfer', 'C. Real-Time Service Tool', 'D. Robust Enterprise Solution'],
            answer: 'A',
            explanation: 'REST is an architectural style for designing networked applications using HTTP methods.'
        },
        {
            question: 'Which of the following is a machine learning framework?',
            options: ['A. TensorFlow', 'B. OpenSSL', 'C. Apache Kafka', 'D. Nginx'],
            answer: 'A',
            explanation: 'TensorFlow is an open-source machine learning framework developed by Google.'
        },
        {
            question: 'The term "edge computing" refers to:',
            options: ['A. Processing data at the center of a network', 'B. Processing data at the periphery of a network', 'C. Storing data locally on devices', 'D. Transmitting data directly to the cloud'],
            answer: 'B',
            explanation: 'Edge computing processes data closer to where it is generated, reducing latency and bandwidth usage.'
        },
        {
            question: 'Which protocol is used for device discovery, service announcement, and service discovery in IoT?',
            options: ['A. DNS-SD', 'B. UPnP', 'C. FTP', 'D. SNMP'],
            answer: 'B',
            explanation: 'UPnP (Universal Plug and Play) is a set of networking protocols that permits networked devices to discover each other and establish services for data sharing and communications.'
        },
        {
            question: 'Which of the following is not an input device?',
            options: ['A. Keyboard', 'B. Mouse', 'C. Printer', 'D. Scanner'],
            answer: 'C',
            explanation: 'A printer is an output device that produces physical copies of digital documents.'
        },
        {
            question: 'A ____ is a unit of measurement for data storage.',
            options: ['A. bit', 'B. byte', 'C. hertz', 'D. watt'],
            answer: 'B',
            explanation: 'A byte (8 bits) is the fundamental unit for measuring data storage capacity.'
        },
        {
            question: 'Which of the following is a database management system?',
            options: ['A. MySQL', 'B. Photoshop', 'C. Premiere', 'D. After Effects'],
            answer: 'A',
            explanation: 'MySQL is a popular open-source relational database management system.'
        },
        {
            question: 'Which of the following is the correct abbreviation for "Hypertext Markup Language"?',
            options: ['A. HTML', 'B. HTTP', 'C. HML', 'D. HMTP'],
            answer: 'A',
            explanation: 'HTML is the standard markup language for creating web pages.'
        },
        {
            question: 'A ____ is a collection of data that is stored in a computer system.',
            options: ['A. file', 'B. folder', 'C. database', 'D. registry'],
            answer: 'C',
            explanation: 'A database is an organized collection of structured information stored electronically.'
        },
        {
            question: 'The term "CPU" stands for ____.',
            options: ['A. Central Processing Unit', 'B. Computer Peripheral Unit', 'C. Control Processing Unit', 'D. Central Peripheral Unit'],
            answer: 'A',
            explanation: 'The CPU is the primary component that executes instructions and processes data.'
        },
        {
            question: 'In a computer network, a ____ is used to connect different networks together.',
            options: ['A. hub', 'B. switch', 'C. router', 'D. modem'],
            answer: 'C',
            explanation: 'A router connects multiple networks and directs traffic between them.'
        },
        {
            question: 'Which of the following is a programming language for web development?',
            options: ['A. Java', 'B. C++', 'C. Python', 'D. All of the above'],
            answer: 'D',
            explanation: 'Java, C++, and Python can all be used for web development in various capacities.'
        },
        {
            question: 'The ____ is the part of a computer that displays the output.',
            options: ['A. monitor', 'B. printer', 'C. scanner', 'D. keyboard'],
            answer: 'A',
            explanation: 'A monitor displays visual output from a computer.'
        },
        {
            question: 'A ____ is a malicious software program that replicates itself and spreads to other computers.',
            options: ['A. Virus', 'B. worm', 'C. Trojan horse', 'D. Spyware'],
            answer: 'B',
            explanation: 'A worm self-replicates and spreads without needing to attach to other programs.'
        },
        {
            question: 'The speed at which data is transferred over a network is measured in ____.',
            options: ['A. bits per second', 'B. bytes per second', 'C. hertz', 'D. watts'],
            answer: 'A',
            explanation: 'Network speed is typically measured in bits per second (bps), Mbps, or Gbps.'
        },
        {
            question: 'Which of the following is an example of an output device?',
            options: ['A. Mouse', 'B. Speaker', 'C. Microphone', 'D. Scanner'],
            answer: 'B',
            explanation: 'A speaker outputs audio from a computer.'
        },
        {
            question: 'The process of converting digital data into analog data is called ____.',
            options: ['A. modulation', 'B. demodulation', 'C. encoding', 'D. decoding'],
            answer: 'A',
            explanation: 'Modulation converts digital signals to analog for transmission over analog media.'
        },
        {
            question: 'A ____ is a set of rules and procedures for a computer to follow.',
            options: ['A. Program', 'B. system', 'C. protocol', 'D. algorithm'],
            answer: 'D',
            explanation: 'An algorithm is a step-by-step procedure for solving a problem or performing a task.'
        },
        {
            question: 'Which of the following is a type of computer memory that is non-volatile?',
            options: ['A. RAM', 'B. ROM', 'C. Cache', 'D. HDD'],
            answer: 'B',
            explanation: 'ROM (Read-Only Memory) retains data even when power is turned off.'
        },
        {
            question: 'The ____ layer in the OSI model is responsible for error detection and correction.',
            options: ['A. physical', 'B. data link', 'C. network', 'D. transport'],
            answer: 'C',
            explanation: 'The network layer handles error detection and correction in data transmission across networks.'
        },
        {
            question: 'A ____ is a device that allows a computer to connect to a wireless network.',
            options: ['A. NIC', 'B. GPU', 'C. Wi-Fi adapter', 'D. PSU'],
            answer: 'C',
            explanation: 'A Wi-Fi adapter enables wireless network connectivity for a computer.'
        },
        {
            question: 'The process of starting a computer and loading the operating system is called ____.',
            options: ['A. booting', 'B. shutting down', 'C. hibernating', 'D. Standby'],
            answer: 'A',
            explanation: 'Booting initializes the computer hardware and loads the operating system into memory.'
        },
        {
            question: 'The "LAN" in networking stands for ____.',
            options: ['A. Local Area Network', 'B. Long Area Network', 'C. Large Area Network', 'D. Limited Area Network'],
            answer: 'A',
            explanation: 'A LAN is a network that connects computers within a limited area like an office or building.'
        },
        {
            question: 'Which of the following is an input device?',
            options: ['A. Printer', 'B. Monitor', 'C. Keyboard', 'D. Speaker'],
            answer: 'C',
            explanation: 'A keyboard is an input device used to enter data into a computer.'
        },
        {
            question: 'What does "RAM" stand for in computer terminology?',
            options: ['A. Random Access Memory', 'B. Read-Only Memory', 'C. Hard Disk Drive', 'D. Solid State Drive'],
            answer: 'A',
            explanation: 'RAM is volatile memory used for temporary data storage during program execution.'
        },
        {
            question: 'In the context of networking, "IP" refers to:',
            options: ['A. Internet Provider', 'B. Input Processor', 'C. Internet Protocol', 'D. Image Processing'],
            answer: 'C',
            explanation: 'IP (Internet Protocol) is the principal communications protocol for routing data packets.'
        },
        {
            question: 'Which programming language is widely used for IoT device development due to its simplicity and support for microcontrollers?',
            options: ['A. Java', 'B. Python', 'C. Ruby', 'D. C#'],
            answer: 'B',
            explanation: 'Python is popular for IoT development due to its simplicity and extensive library support.'
        },
        {
            question: 'What is the primary function of an Operating System (OS)?',
            options: ['A. To manage hardware resources and provide an interface for application software.', 'B. To design web pages.', 'C. To store data permanently.', 'D. To create graphics.'],
            answer: 'A',
            explanation: 'An OS manages hardware resources and provides services for application software.'
        },
        {
            question: 'Which of the following is NOT a type of cloud computing service model?',
            options: ['A. SaaS', 'B. IaaS', 'C. DaaS', 'D. PaaS'],
            answer: 'C',
            explanation: 'The three main cloud service models are SaaS, IaaS, and PaaS. DaaS (Desktop as a Service) is less common.'
        },
        {
            question: 'Which of the following is a markup language?',
            options: ['A. CSS', 'B. JavaScript', 'C. XML', 'D. Python'],
            answer: 'C',
            explanation: 'XML (Extensible Markup Language) is a markup language for encoding documents.'
        },
        {
            question: 'A ____ is a set of programs that manage the computer\'s hardware and software resources.',
            options: ['A. application software', 'B. system software', 'C. utility software', 'D. firmware'],
            answer: 'B',
            explanation: 'System software includes the operating system and utilities that manage computer resources.'
        },
        {
            question: 'The ____ is the part of the computer that performs arithmetic and logical operations.',
            options: ['A. ALU (Arithmetic Logic Unit)', 'B. CU (Control Unit)', 'C. CPU (Central Processing Unit)', 'D. GPU (Graphics Processing Unit)'],
            answer: 'A',
            explanation: 'The ALU is the component within the CPU that performs arithmetic and logical operations.'
        },
        {
            question: 'A ____ is a small amount of very fast memory that is used to store frequently accessed data.',
            options: ['A. ROM', 'B. RAM', 'C. Cache', 'D. HDD'],
            answer: 'C',
            explanation: 'Cache memory provides high-speed data access for frequently used instructions and data.'
        },
        {
            question: 'The ____ is a global network of interconnected computer networks.',
            options: ['A. LAN', 'B. WAN', 'C. Internet', 'D. Intranet'],
            answer: 'C',
            explanation: 'The Internet is the worldwide network that connects billions of devices.'
        },
        {
            question: 'A ____ is a program that translates high-level programming languages into machine language.',
            options: ['A. compiler', 'B. interpreter', 'C. assembler', 'D. linker'],
            answer: 'A',
            explanation: 'A compiler translates source code into machine code before program execution.'
        },
        {
            question: 'Which of the following is a database query language?',
            options: ['A. SQL', 'B. HTML', 'C. CSS', 'D. JavaScript'],
            answer: 'A',
            explanation: 'SQL (Structured Query Language) is used to manage and query relational databases.'
        },
        {
            question: 'The ____ is the part of a computer that stores programs and data that are currently being used.',
            options: ['A. hard drive', 'B. RAM', 'C. ROM', 'D. Cache'],
            answer: 'B',
            explanation: 'RAM stores programs and data that are actively being used by the CPU.'
        },
        {
            question: 'A ____ is a malicious program that secretly collects information about a user\'s computer activities.',
            options: ['A. Spyware', 'B. Adware', 'C. Malware', 'D. Ransomware'],
            answer: 'A',
            explanation: 'Spyware secretly monitors user activities and collects personal information.'
        },
        {
            question: 'Which of the following is a programming language?',
            options: ['A. Windows', 'B. Python', 'C. Excel', 'D. PowerPoint'],
            answer: 'B',
            explanation: 'Python is a versatile, high-level programming language.'
        }
    ],
    trueFalse: [
        {
            question: 'A firewall is a software or hardware device that blocks unauthorized access to a computer or network.',
            answer: true,
            explanation: 'Firewalls monitor and control incoming and outgoing network traffic based on security rules.'
        },
        {
            question: 'The CPU is the part of the computer that stores data.',
            answer: false,
            explanation: 'The CPU processes data; storage is handled by hard drives, SSDs, and RAM.'
        },
        {
            question: 'JavaScript is only used for front-end web development.',
            answer: false,
            explanation: 'JavaScript is also used for back-end development with Node.js and other server-side applications.'
        },
        {
            question: 'Bluetooth is a wireless technology used for short-range communication.',
            answer: true,
            explanation: 'Bluetooth enables short-range wireless communication between devices.'
        },
        {
            question: 'A virus can only spread through email attachments.',
            answer: false,
            explanation: 'Viruses can spread through USB drives, downloads, networks, and other methods.'
        },
        {
            question: 'The cloud refers to storing data and programs on the Internet rather than on a local computer.',
            answer: true,
            explanation: 'Cloud computing provides on-demand access to computing resources over the internet.'
        },
        {
            question: 'HTML is used to style web pages.',
            answer: false,
            explanation: 'HTML defines the structure of web pages; CSS is used for styling.'
        },
        {
            question: 'A router can only connect two computers.',
            answer: false,
            explanation: 'Routers can connect multiple devices and networks simultaneously.'
        },
        {
            question: 'An algorithm is a step-by-step procedure for solving a problem.',
            answer: true,
            explanation: 'An algorithm is a well-defined sequence of steps to solve a specific problem.'
        },
        {
            question: 'SSD (Solid State Drive) is faster than HDD (Hard Disk Drive).',
            answer: true,
            explanation: 'SSDs use flash memory and have no moving parts, making them faster than HDDs.'
        },
        {
            question: 'The operating system is a type of application software.',
            answer: false,
            explanation: 'The operating system is system software, not application software.'
        },
        {
            question: 'A firewall can prevent all types of cyberattacks.',
            answer: false,
            explanation: 'Firewalls provide one layer of security but cannot prevent all types of attacks.'
        },
        {
            question: 'JavaScript is a markup language.',
            answer: false,
            explanation: 'JavaScript is a programming language; HTML and XML are markup languages.'
        },
        {
            question: 'A router can only be used in a wired network.',
            answer: false,
            explanation: 'Routers support both wired and wireless network connections.'
        },
        {
            question: 'The cloud is a physical storage device.',
            answer: false,
            explanation: 'The cloud refers to remote servers accessed via the internet, not a physical device.'
        },
        {
            question: 'A virus can be spread through a USB drive.',
            answer: true,
            explanation: 'USB drives are a common method for spreading computer viruses.'
        },
        {
            question: 'HTML is used to create the structure and content of a web page.',
            answer: true,
            explanation: 'HTML (Hypertext Markup Language) defines the structure and content of web pages.'
        },
        {
            question: 'The CPU is the only component that affects a computer\'s performance.',
            answer: false,
            explanation: 'RAM, storage speed, GPU, and other components also affect performance.'
        },
        {
            question: 'Encryption is used to protect data from unauthorized access.',
            answer: true,
            explanation: 'Encryption converts data into a coded format that requires a key to decrypt.'
        },
        {
            question: 'A worm needs a host program to spread.',
            answer: false,
            explanation: 'Unlike viruses, worms are self-replicating and do not need a host program.'
        },
        {
            question: 'The motherboard is the main circuit board of a computer.',
            answer: true,
            explanation: 'The motherboard connects all computer components and allows them to communicate.'
        },
        {
            question: 'A Trojan horse appears to be a legitimate program but actually contains malicious code.',
            answer: true,
            explanation: 'Trojans disguise themselves as legitimate software to trick users into installing them.'
        },
        {
            question: 'The speed of a computer\'s CPU is measured in gigabytes.',
            answer: false,
            explanation: 'CPU speed is measured in Hertz (GHz); gigabytes measure storage capacity.'
        },
        {
            question: 'A database can only store text data.',
            answer: false,
            explanation: 'Databases can store various data types including numbers, images, and binary data.'
        },
        {
            question: 'A modem is used to convert digital signals to analog signals and vice versa.',
            answer: true,
            explanation: 'Modems modulate and demodulate signals for transmission over phone lines.'
        },
        {
            question: 'Blockchain technology is widely used in IoT for secure data transactions.',
            answer: true,
            explanation: 'Blockchain provides secure, decentralized data management for IoT applications.'
        },
        {
            question: 'Zigbee is a low-power, low-data-rate wireless communication protocol.',
            answer: true,
            explanation: 'Zigbee is designed for low-power IoT devices requiring short-range communication.'
        },
        {
            question: 'HTTP is a secure protocol used for transmitting sensitive information.',
            answer: false,
            explanation: 'HTTP is not secure; HTTPS provides encryption for secure communication.'
        },
        {
            question: 'RFID tags can be actively powered or passively powered.',
            answer: true,
            explanation: 'Active RFID tags have batteries; passive tags are powered by the reader\'s signal.'
        },
        {
            question: 'All IoT devices require a constant internet connection to function.',
            answer: false,
            explanation: 'Many IoT devices can operate offline and sync when connected.'
        },
        {
            question: 'In the context of IoT, a hub is responsible for connecting devices to the internet.',
            answer: true,
            explanation: 'IoT hubs connect multiple devices and provide internet connectivity.'
        },
        {
            question: 'The term "fog computing" is synonymous with cloud computing.',
            answer: false,
            explanation: 'Fog computing extends cloud computing to the edge of the network.'
        },
        {
            question: 'The MQTT protocol supports only one-way communication.',
            answer: false,
            explanation: 'MQTT supports bidirectional publish-subscribe communication.'
        },
        {
            question: 'IoT security primarily focuses on protecting data at rest.',
            answer: false,
            explanation: 'IoT security covers data at rest, in transit, and device security.'
        },
        {
            question: 'The IPSO Alliance develops standards for interoperability in IoT.',
            answer: true,
            explanation: 'IPSO Alliance promotes interoperability standards for IoT devices.'
        },
        {
            question: 'LoRaWAN is a long-range communication protocol suitable for urban environments.',
            answer: true,
            explanation: 'LoRaWAN provides long-range, low-power communication for IoT applications.'
        },
        {
            question: 'The term "IoT platform" refers to the hardware used in IoT systems.',
            answer: false,
            explanation: 'IoT platforms are software and services for managing IoT devices and data.'
        },
        {
            question: 'Thread is a mesh networking protocol specifically designed for IoT devices.',
            answer: true,
            explanation: 'Thread is an IPv6-based mesh networking protocol for IoT home automation.'
        },
        {
            question: 'In edge computing, data processing occurs closer to the data source than in cloud computing.',
            answer: true,
            explanation: 'Edge computing processes data near the source to reduce latency and bandwidth usage.'
        },
        {
            question: 'The term "Big Data" refers to large volumes of structured data only.',
            answer: false,
            explanation: 'Big Data includes structured, semi-structured, and unstructured data.'
        },
        {
            question: 'The operating system is an application software.',
            answer: false,
            explanation: 'The operating system is system software that manages computer resources.'
        },
        {
            question: 'A bitmap is a type of vector graphic.',
            answer: false,
            explanation: 'Bitmaps are raster graphics made of pixels; vector graphics use mathematical paths.'
        },
        {
            question: 'Wi-Fi is a wired networking technology.',
            answer: false,
            explanation: 'Wi-Fi is a wireless networking technology based on IEEE 802.11 standards.'
        },
        {
            question: 'A macro virus infects macro-enabled documents.',
            answer: true,
            explanation: 'Macro viruses target documents with macros, like Word and Excel files.'
        },
        {
            question: 'Assembly language is a high-level programming language.',
            answer: false,
            explanation: 'Assembly language is a low-level language close to machine code.'
        },
        {
            question: 'A proxy server acts as an intermediary between a client and a server.',
            answer: true,
            explanation: 'Proxy servers forward requests and responses between clients and servers.'
        },
        {
            question: 'A RAID (Redundant Array of Independent Disks) is used to improve data storage reliability.',
            answer: true,
            explanation: 'RAID combines multiple drives for improved performance, redundancy, or both.'
        },
        {
            question: 'A dongle is a small device that plugs into a computer\'s USB port to provide additional functionality.',
            answer: true,
            explanation: 'Dongles provide various functions like Wi-Fi, Bluetooth, or software licenses.'
        }
    ]
};

// 导出题库数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionData;
}

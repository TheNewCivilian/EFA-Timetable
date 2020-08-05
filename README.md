[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">EVA Timetable Node.js</h3>

  <p align="center">
    This node.js application displays EFA (Elektronische Fahrplan Auskunft) content.
    Its by default configured to capture stations of the "Augsburger Verkehrs Verbund"
    <!-- <br />
    <a href="https://github.com/github_username/repo"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://github.com/TheNewCivilian/AVV_EFA_Timetable/issues">Report Bug</a>
    ·
    <a href="https://github.com/TheNewCivilian/AVV_EFA_Timetable/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

This Project evolved from being a python standalone application to a Node.js version.
You can still find the standalone build at tag [v1.0](https://github.com/TheNewCivilian/AVV_EFA_Timetable/releases/tag/V1.0).


[![A chat window of a client][product-screenshot1]]()
Screenshot of V1 implementation.

### Customization

To customize this departure board see /src/config.js

You can also change to a different EFA data provider.
Some are listed here:

Linz (Austria)
https://www.linzag.at/linz2/

Freiburg (Germany)
http://efa.vag-freiburg.de/vagfr/

Augsburg (Germany)
https://efa.avv-augsburg.de/avv2/

### Built With

* [Node.js](https://nodejs.org/en/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Installation
 
1. Clone the repo
```sh
git clone https://github.com/TheNewCivilian/AVV_EFA_Timetable
```

2. Run the node.js development Server
```sh
npm run dev
```

3. Check the Timetable
[https://localhost:8080](https://localhost:8080)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/TheNewCivilian/AVV_EFA_Timetable/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact & Contributors

TheNewCivilian - [https://neuz8t.de](https://neuz8t.de) - private Webpage

Project Link: [https://github.com/TheNewCivilian/AVV_EFA_Timetable](https://github.com/TheNewCivilian/AVV_EFA_Timetable)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[contributors-url]: https://github.com/TheNewCivilian/AVV_EFA_Timetable/contributors
[forks-shield]: https://img.shields.io/github/forks/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[forks-url]: https://github.com/TheNewCivilian/AVV_EFA_Timetable/network/members
[stars-shield]: https://img.shields.io/github/stars/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[stars-url]: https://github.com/TheNewCivilian/AVV_EFA_Timetable/stargazers
[issues-shield]: https://img.shields.io/github/issues/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[issues-url]: https://github.com/TheNewCivilian/AVV_EFA_Timetable/issues
[product-screenshot1]: product-screenshot1.png
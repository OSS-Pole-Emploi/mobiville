const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { METIER, ENDROIT } from "./home-page";

const rappelCritereVille = "div[tag-page$=city] * > div > h1";
const rappelCritereMetier = "div[tag-page$=city] * > div > h1";
const infoOpportunites = "div[tag-page$=city] > div ";
const infoOffres = "div[tag-page$=city] * > div > p";
const infoEntreprises = "div[tag-page$=city] * > div > p";
const infoTauxEmbauche = "div[tag-page$=city] * > div > p";
const resultatOffre = "div[tag-page$=city] * > div > h2";
const nombreOffres = "div[tag-page$=city] > div:nth-child(5) > div";
const boutonVoirToutesOffres =  "div[tag-page$=city] > div:nth-child(6) > a";
const resultatEntreprise = "div[tag-page$=city] * > div > h2";
const donneesTensionImmobiliere = "div[tag-page$=city] > div:nth-child(9) > div > div > div";
const donneePrixUniteSurfaceAchat = "div[tag-page$=city] > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)";
const donneeLoyerF2Location = "div[tag-page$=city] > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)";
const donneeLoyerF4Location = "div[tag-page$=city] > div:nth-child(9) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)";
const aidesVille = "div[tag-page$=city] * > div > h2";
const nombreAides = "div[tag-page$=city] > div:nth-child(11) > div:nth-child(1) > div";
const premiereAide = "a[href*=aide-pour-la-recherche-demploi]";
const deuxiemeAide = "a[href*=subvention-mobili-pass]";
const troisiemeAide = "a[href*=garantie-visale]";
const boutonVoirToutesAides = "div[tag-page$=city] * > div > a";
const servicesVille = "div[tag-page$=city] * > div > p";
const boutonVoirTousServices  =  "div[tag-page$=city] * > div > a";
const nombreBlocsEntreprises = "div[tag-page$=city] > div:nth-child(8) > div > div:nth-child(1)";

Then("j'affiche la page de la ville pour le métier", function () {
  let villeSansCP = ENDROIT.split(' (')[0];
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereVille, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');

  cy.contains(infoOpportunites, "pportunités d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoOffres, "Offres d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoEntreprises, "Entreprises", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoTauxEmbauche, "Taux d'embauche", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la page de la ville similaire/proche pour le métier", function () {
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
  })

Then("j'affiche les offres d'emploi qui ont le moins de candidature", function () {
  cy.contains(resultatOffre, "Les dernières offres d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(nombreOffres, {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 3);
})

When("je clique sur la première des trois offres d'emploi", function () {
  cy.get(nombreOffres, {timeout: SHORT_WAIT_TIME}).first().click();
  cy.wait(1000);
})

When("je clique sur Voir toutes les offres d’emploi", function () {
  cy.contains(boutonVoirToutesOffres, "Voir toutes les offres d’emploi", {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(1000);
})

Then("j'affiche la liste des entreprises à proximité", function () {
  cy.contains(resultatEntreprise, "Les entreprises qui recrutent à proximité", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(nombreBlocsEntreprises, {timeout: SHORT_WAIT_TIME}).children().should('have.length.lte', 2);
})

Then("j'affiche le prix d'achat moyen au m²", function () {
  cy.contains(donneesTensionImmobiliere, "Tension immobilière a l'achat", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(donneePrixUniteSurfaceAchat, "Prix d’achat moyen/m2", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les loyers moyens pour un logement F2 et F4", function () {
  cy.contains(donneeLoyerF2Location, "Loyer moyen en location", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(donneeLoyerF4Location, "Loyer moyen en location", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les trois aides pour m'accompagner dans mon projet", function () {
  cy.contains(aidesVille, "Les aides pour vous accompagner dans votre projet", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.wait(SHORT_WAIT_TIME);
  cy.get(nombreAides, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 3);
  cy.get(premiereAide, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(deuxiemeAide, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(troisiemeAide, {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le premier des trois liens Découvrir l'aide", function () {
  cy.contains(premiereAide, "Découvrir l'aide", {timeout: MIDDLE_WAIT_TIME}).click();
  cy.wait(1000);
})

When("je clique sur Voir tous les aides", function () {
  cy.contains(boutonVoirToutesAides, "Voir toutes les aides", {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(1000);
})

Then("j'affiche la découverte des services de la ville", function () {
  cy.contains(servicesVille, "Découvrez les services de la ville", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur Voir tous les services", function () {
  cy.contains(boutonVoirTousServices, "Voir tous les services", {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(1000);
})
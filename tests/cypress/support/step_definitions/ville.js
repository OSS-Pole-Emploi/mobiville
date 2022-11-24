const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";
import { METIER, ENDROIT } from "./formulaire-recherche";

const rappelCritereVille = "main[id=main] * > div > h1";
const rappelCritereMetier = "main[id=main] * > div > h1";
const infoOpportunites = "main[id=main] > div > div ";
const infoOffres = "main[id=main] * > div > p";
const infoEntreprises = "main[id=main] * > div > p";
// const infoTauxEmbauche = "main[id=main] * > div > p";

Then("j'affiche la page de la ville pour le métier", function () {
  let villeSansCP = ENDROIT.split(' (')[0];
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereVille, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');

  cy.contains(infoOpportunites, "Opportunités d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoOffres, "Offres d'emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoEntreprises, "Entreprises", {timeout: SHORT_WAIT_TIME}).should('exist');
  // cy.contains(infoTauxEmbauche, "Taux d'embauche", {timeout: SHORT_WAIT_TIME}).should('exist');
})
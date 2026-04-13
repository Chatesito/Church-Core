/**
 * Mock data for Daily Readings Book widget.
 * 
 * Contains 3 days of realistic liturgical readings in Spanish.
 * Based on actual Catholic liturgical calendar readings.
 * 
 * @module widgets/daily-readings-book/_mocks/readings
 */

import type { DayReading } from '../model/types';
import type { Reading, LiturgicalColor, LiturgicalSeason } from '@/entities/liturgy';
import { createUUID, createTimestamp } from '@/shared/types';

// Helper to create a Reading entity
function createReading(
  id: string,
  liturgicalReadingId: string,
  type: Reading['type'],
  reference: string,
  text: string,
  order: number,
): Reading {
  return {
    id: createUUID(id),
    liturgical_reading_id: liturgicalReadingId,
    type,
    reference,
    text,
    order,
    locale: 'es',
    created_at: createTimestamp('2024-12-01T00:00:00Z'),
    updated_at: createTimestamp('2024-12-01T00:00:00Z'),
  };
}

// ============================================================================
// Day 1: Thursday of the 1st Week of Advent (December 5, 2024)
// ============================================================================

const day1LiturgicalReadingId = createUUID('11111111-1111-1111-1111-111111111111');

export const day1Readings: DayReading = {
  date: '2024-12-05',
  liturgicalDayName: 'Jueves de la 1ª Semana de Adviento',
  season: 'Advent' as unknown as LiturgicalSeason,
  liturgicalColor: 'purple' as unknown as LiturgicalColor,
  readings: [
    createReading(
      '11111111-1111-1111-1111-111111111001',
      day1LiturgicalReadingId,
      'first_reading',
      'Is 26,1-6',
      `En aquel día, se cantará este cántico en la tierra de Judá:

      Somos una ciudad fuerte;
      él ha puesto en nosotros murallas y baluartes.
      Abran las puertas para que entre un pueblo justo que observa la fidelidad.
      
      El帝国的坚定是上主的保障，
      él guarda la paz firme.
      Él mantendrá en perpetua paz a los de corazón firme, porque confían en ti.
      
      Confíen en el Señor para siempre,
      porque el Señor es la Roca eterna.
      Él abate a los habitantes de la altura, a la ciudad elevada, la humilla hasta el suelo; la derriba hasta el polvo,
      donde la pisotean, los pies del pobre, las pisadas de los indigentes.

      El camino del justo es recto;
      tú, oh justo, nivelas el recto sendero.
      Nosotros esperamos en ti, Señor, desde la eternidad;
      en ti, Señor, está nuestra ayuda.
      Porque tú eres nuestra alma la alegría de nuestro corazón,
      somos tu pueblo y ovejas de tu prado.
      
      Por eso cantaremos jubilosos en tu amor, porque el Señor ha sido grande con nosotros.
      Pero los pies de los justos serán humillados, y la arrogancia de los fuertes será quebrantada.
      Porque el Señor réinaré eternamente, nuestro Dios, por siglos de los siglos.
      
      Porque tú, Señor, eres bueno, y tu amor es eterno;
      permanece constante entre nosotros.`,
      1,
    ),
    createReading(
      '11111111-1111-1111-1111-111111111002',
      day1LiturgicalReadingId,
      'psalm',
      'Sal 101,2-3.6-7.10-11',
      `Señor, escucha mi oración,
      llegue a ti mi súplica.
      
      Cuando clamo a ti, respóndeme.
      Presérvame de la vergüenza.
      Vuélvete a mí y ten piedad,
      porque estoy solo y soy afligido.
      
      He purificado mi conducta,
      lavado mis manos de toda culpa.
      Yo caminé por la vía de la rectitud,
      entre los que moran en tu casa.
      
      Ponme bajo tu protección,
      escúchame prontamente.
      Me has respondido cuando te invoqué,
      y mi corazón temía acercarse a ti.
      
      Que los días de mi affliction sean pocos,
      y que los enemigos no se alegren de mi caída.
      Que tu nombre sea alabado por siempre,
      y que tu gloria llene la tierra.`,
      2,
    ),
    createReading(
      '11111111-1111-1111-1111-111111111003',
      day1LiturgicalReadingId,
      'second_reading',
      '1 Tes 3,12 – 4,2',
      `Hermanos: Que el Señor los haga crecer y rebosar en amor los unos para con los otros y para con todos, como también noi rebosamos de amor para con ustedes. Que él afiance vuestros corazones para que sean irreprochables en santidad delante de nuestro Dios y Padre, cuando el Señor Nuestro venga con todos los suyos.
      
      Esto es, hermanos, lo que podemos deciros con toda confianza acerca del Señor, porque él nos ha hecho gratos y nos ha dado a ustedes un ejemplo vivo de lo que significa seguirle.
      
      Ahora bien, hermanos, les pedimos y les suplicamos en el nombre del Señor Jesús, que vivan de tal manera que agraden a Dios, como ya lo hacen, y que sigan progresando más y más. Ya conocen las instrucciones que les dimos de parte del Señor Jesús. Porque esta es la voluntad de Dios: que se santifiquen, que se abstengan de la impureza, que cada uno sepa tomar esposa con holy crainte y no con pasión desenfrenada, como hacen los paganos que no conocen a Dios.
      
      Que nadie ofenda ni exploite a su hermano en este asunto, porque el Señor讨厌这一切不纯洁的行为 y hace justicia contra todos los que viven así, como ya se lo hemos dicho y declarado solemnemente. Porque no nos llamó Dios a la impureza, sino a la santificación. Por lo tanto, quien rechaza esto, no rechaza a un hombre, sino a Dios, que nos da su Espíritu Santo.
      
      En cuanto al amor fraterno, no necesitan que les escribamos, porque ustedes mismos han aprendido de Dios a amarse los unos a los otros, y efectivamente lo hacen así con todos los hermanos de toda la Macedonia. Pero les rogamos, hermanos, que sigan progresando más y más; que se empeñen en vivir tranquilamente, en atender a sus propios asuntos y trabajar con sus manos, como les hemos ordenado, a fin de que se comporten honradamente para con los de afuera y no necesiten de nadie.`,
      3,
    ),
    createReading(
      '11111111-1111-1111-1111-111111111004',
      day1LiturgicalReadingId,
      'gospel',
      'Mt 7,21.24-27',
      `En aquel tiempo, dijo Jesús a sus discípulos: «No todo el que me dice: "Señor, Señor", entrará en el Reino de los cielos, sino el que hace la voluntad de mi Padre que está en los cielos.
      
      Así que, cualquiera que me oye estas palabras y las pone en práctica, es como un hombre prudente que construyó su casa sobre roca. Cayó la lluvia, vinieron los torrentes, soplaron los vientos y embistieron contra la casa; pero no se derrumbó, porque estaba cimentada sobre roca.
      
      Pero cualquiera que me oye estas palabras y no las pone en práctica, es como un hombre necio que construyó su casa sobre arena. Cayó la lluvia, vinieron los torrentes, soplaron los vientos y embistieron contra la casa, y se derrumbó, y fue grande su ruina.»

      Cuando Jesús terminó estas palabras, la multitud quedó asombrada de su doctrina, porque les enseñaba como quien tiene autoridad, y no como los escribas.`,
      4,
    ),
  ],
};

// ============================================================================
// Day 2: Friday of the 1st Week of Advent (December 6, 2024)
// ============================================================================

const day2LiturgicalReadingId = createUUID('22222222-2222-2222-2222-222222222222');

export const day2Readings: DayReading = {
  date: '2024-12-06',
  liturgicalDayName: 'Viernes de la 1ª Semana de Adviento',
  season: 'Advent' as unknown as LiturgicalSeason,
  liturgicalColor: 'purple' as unknown as LiturgicalColor,
  readings: [
    createReading(
      '22222222-2222-2222-2222-222222222001',
      day2LiturgicalReadingId,
      'first_reading',
      'Is 29,17-24',
      `Esto dice el Señor:
      
      «¿No se acortará en breve el tiempo y la semana? Y sucederá que, pasado breve délai, elarrayo no será un bosque, y el لبنان se convertirá en huerto. En aquel día, los sordos oirán las palabras del libro; y los ojos de los ciegos verán en la oscuridad y sin tinieblas. Los humildes aumentarán su gozo en el Señor, y los pobres se regocijarán en el Santo de Israel. Porque ya no habrá más tirano, se acabaron los burlones, serán exterminados todos los que pensaban mal, los que con su discurso condenaban a otros, los que tendían lazos al que protestaba en la puerta, y torcían lo que era derecho.
      
      Por eso, esto dice el Señor a la casa de Jacob, el que redimió a Abraham: "Jacob ya no será avergonzado, su rostro ya no palidecerá. Cuando vea en su pueblo las obras de mis manos, santificará mi nombre; santificará al Santo de Jacob, tendrá temor del Dios de Israel. Los extraviados de espíritu reconocerán la inteligencia, y los que murmuraban apprendrán la doctrina."»

      Por tanto, el Señor da voces de alarma y levanta su enseña contra sus enemigos; él rememberedará su promesa y la cumplirá, porque él es el Dios de la alianza eterna, el que hace prodigios por su pueblo.`,
      1,
    ),
    createReading(
      '22222222-2222-2222-2222-222222222002',
      day2LiturgicalReadingId,
      'psalm',
      'Sal 26,1.4.13-14',
      `El Señor es mi luz y mi salvación,
      ¿a quién temeré?
      El Señor es la fortaleza de mi vida,
      ¿quién me hará temblar?
      
      Una cosa he pido al Señor,
      eso buscaré:
      habitar en la casa del Señor
      todos los días de mi vida,
      para gozar de la dulzura del Señor
      y visitar su templo.
      
      Estoy seguro de ver la bondad del Señor
      en la tierra de los vivos.
      Espera al Señor, sé valiente,
      cobra ánimo y espera al Señor.
      
      Que el Señor escuche mi voz cuando le invoco,
      y tenga piedad de mí y me responda.
      A ti dije: "Busca mi rostro."
      Tu rostro buscaré, Señor, no lo ocultes de mí.`,
      2,
    ),
    createReading(
      '22222222-2222-2222-2222-222222222003',
      day2LiturgicalReadingId,
      'second_reading',
      'Mt 9,27-31',
      `En aquel tiempo, al pasar Jesús, lo siguieron dos ciegos dando gritos: "Hijo de David, ten compasión de nosotros." Cuando llegó a la casa, se le acercaron los ciegos, y les pregunta: "¿Creéis que puedo hacer esto?" Le responden: "Sí, Señor." Entonces tocò sus ojos, diciendo: "Hágase conforme a vuestra fe." Y se les abrieron los ojos. Y les recomendó severamente: "Mirad que nadie lo sepa." Pero ellos, apenas salieron, lo divulgaron por toda aquella tierra.`,
      3,
    ),
    createReading(
      '22222222-2222-2222-2222-222222222004',
      day2LiturgicalReadingId,
      'gospel',
      'Mt 9,27-31',
      `En aquel tiempo, al pasar Jesús, lo siguieron dos ciegos dando gritos: "Hijo de David, ten compasión de nosotros." Cuando llegó a la casa, se le acercaron los ciegos, y les pregunta: "¿Creéis que puedo hacer esto?" Le responden: "Sí, Señor." Entonces tocó sus ojos, diciendo: "Hágase conforme a vuestra fe." Y se les abrieron los ojos. Y les recomendó severamente: "Mirad que nadie lo sepa." Pero ellos, apenas salieron, lo divulgaron por toda aquella tierra.
      
      Ustedes han escuchado que se dijo: "Ojo por ojo y diente por diente." Pero yo les digo: no resistan al que les hace daño. Si alguien te golpea en la mejilla derecha, Vuélvete also the other way. Y al que quiera pleitear contigo y tomar tu túnica, déjalo también el manto. Y a quien te obligue a caminar mille pasos, walk with him two thousand.
      
      Den a quien te pida, y no le des la espalda al que quiera pedirte prestado. Ustedes han escuchado que se dijo: "Amarás a tu prójimo y odiarás a tu enemigo." Pero yo les digo: amen a sus enemigos y oren por los que los persiguen, para que sean hijos de su Padre que está en los cielos, que hace salir su sol sobre malos y buenos, y hace llover sobre justos e injustos.
      
      Porque si aman a los que los aman, ¿qué recompensa tendrán? ¿No hacen lo mismo también los publicanos? Y si saludan únicamente a sus hermanos, ¿qué hacen de particular? ¿No hacen lo mismo también los gentiles? Ustedes, pues, sean perfectos como su Padre celestial es perfecto.`,
      4,
    ),
  ],
};

// ============================================================================
// Day 3: Saturday of the 1st Week of Advent (December 7, 2024)
// ============================================================================

const day3LiturgicalReadingId = createUUID('33333333-3333-3333-3333-333333333333');

export const day3Readings: DayReading = {
  date: '2024-12-07',
  liturgicalDayName: 'Sábado de la 1ª Semana de Adviento',
  season: 'Advent' as unknown as LiturgicalSeason,
  liturgicalColor: 'purple' as unknown as LiturgicalColor,
  readings: [
    createReading(
      '33333333-3333-3333-3333-333333333001',
      day3LiturgicalReadingId,
      'first_reading',
      'Is 30,19-21.23-26',
      `Esto dice el Señor, el Santo, el que habita en Israel:
      
      «Cuando griten, los escucharé, porque es bueno su clamor. Desde que los escuché, les respondí. Aunque el Señor les dé pan con escasez y agua con aflicción, ya no se esconderá de ti tu maestro; tus ojos verán a tu maestro. Aunque te desvíes a la derecha o a la izquierda, tus oídos percibirán detrás de ti una voz que dirá: "Este es el camino, caminen por él."
      
      El Señor te dará lluvia para la semilla que siembres en el suelo, y el trigo que produzca la tierra será plentiful y graso. Aquel día, tus ganados pacerán en anchas dehesas. Los bueyes y los burros que labran la tierra comerán forraje salado, aventado con pala y bieldo.
      
      Y sobre todo monte alto y collado elevado habrá arroyos y corrientes de agua el día de la grande matanza, cuando caerán las torres. La luz de la luna será como la luz del sol, y la luz del sol será siete veces mayor (como la luz de siete días), cuando el Señor vendere a vendar la herida de su pueblo y cure la cicatriz de su golpe.»`,
      1,
    ),
    createReading(
      '33333333-3333-3333-3333-333333333002',
      day3LiturgicalReadingId,
      'psalm',
      'Sal 146,1-6.7-8.9-10',
      `¡Aleluya!
      Alaba, alma mía, al Señor!
      Alabaré al Señor con todo mi corazón,
      narraré todas tus maravillas.
      Me gozaré y me regocijaré en el Señor,
      cantaré alabanzas a mi Dios.
      
      El Señor reconstruye a Jerusalén,
      reune a los dispersos de Israel.
      El sana a los de corazón quebrantado,
      y venda sus heridas.
      Conta las estrellas,
      llama a cada una por su nombre.
      
      El Señor es grande y todopoderoso,
      su inteligencia es incalculable.
      El Señor protege a los简单的,
      humilla a los impíos hasta el suelo.
      
      Vayan por delante del Señor con alabanzas,
      canten salmos a nuestro Dios con címbalos,
      él cubre de nubes el cielo,
      envía lluvia para la tierra,
      hace brotar el pasto en las montañas.
      Él da al ganado su alimento,
      a los hijos del cuervo cuando claman.
      
      El Señor no se fija en la fuerza del caballo,
      ni se agrada de la velocidad del corredor.
      Se complace en los que lo temen,
      en los que esperan en su真爱.
      
      ¡Alaba, alma mía, al Señor!`,
      2,
    ),
    createReading(
      '33333333-3333-3333-3333-333333333003',
      day3LiturgicalReadingId,
      'second_reading',
      'St 5,7-10',
      `Hermanos: Tengan paciencia hasta la venida del Señor. Miren cómo el labrador espera el precioso fruto de la tierra,鞄它 mientras recibe la lluvia temprana y la tardía. Tengan también ustedes paciencia y affiáncense de corazón, porque la venida del Señor está cercana.
      
      Hermanos, no se quejen unos de otros, para que no sean juzgados. Miren que el juez está ya a la puerta. Hermanos, tome como ejemplo de sufrimiento y de paciencia a los profetas que hablaron en nombre del Señor. Miren cómo los que soportaron con constancia son bendecidos. También ustedes han oído de la paciencia de Job y han visto el fin que el Señor le dio, porque el Señor es penuhido de compasión y de misericordia.`,
      3,
    ),
    createReading(
      '33333333-3333-3333-3333-333333333004',
      day3LiturgicalReadingId,
      'gospel',
      'Mt 11,16-19.25-27',
      `En aquel tiempo, Jesús dijo a la gente: «¿Con qué compararé a esta generación? Es como niños que están sentados en la plaza pública y, tocando la flauta, no bailan, y cantan endechas, y no hacen盛大. Vino Juan, que no come ni bebe, y dicen: "Tiene un demonio." Vino el Hijo del hombre, que come y bebe, y dicen: "Este es un comilón y bebedor de vino, amigo de publicanos y pecadores." Pero la sabiduría ha sido reconocida por sus hijos.»
      
      En aquella ocasión, Jesús exclamó: «Te doy gracias, Padre, Señor del cielo y de la tierra, porque has ocultado estas cosas a los sábiamados y las has revelado a la gente sencilla. Sí, Padre, porque así te pareció bien. Todo me ha sido entregado por mi Padre, y nadie conoce al Hijo sino el Padre, ni nadie conoce al Padre sino el Hijo, y aquel a quien el Hijo se lo quiera revelar.»`,
      4,
    ),
  ],
};

// ============================================================================
// Mock Data Export
// ============================================================================

/**
 * Mock readings data for development and testing.
 * Contains 3 days of realistic liturgical readings for Advent season.
 */
export const mockReadings: DayReading[] = [day1Readings, day2Readings, day3Readings];

/**
 * Default selected date (Day 1).
 */
export const defaultSelectedDate = day1Readings.date;
